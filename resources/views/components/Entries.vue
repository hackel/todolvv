<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import DateTimePicker from '@/components/DateTimePicker.vue';
import Entry from '@scripts/models/Entry';
import TodoEntry from '@/components/TodoEntry.vue';
import { useStore } from '@scripts/store';
import pluralize from 'pluralize';
import { Temporal } from '@js-temporal/polyfill';

const store = useStore();

onMounted(() => {
    store.getEntries();
});

const newEntry = ref<InstanceType<typeof TodoEntry> | null>(Entry.new());
const selectAll = ref(false);
const edit = ref<string | null>(null);

const tableHeight = computed(() => (store.entries.length > 10 ? '600px' : undefined));

const entriesSortedByCreatedAtDesc = computed(() => {
    return [...store.entries].sort((a, b) => Temporal.Instant.compare(b.created_at, a.created_at));
});

function editEntry(entry: Entry) {
    edit.value = entry.uuid;
}

function updateEntry(entry: Entry) {
    store.updateEntry(entry);
    edit.value = null;
}

async function storeEntry() {
    await store.addEntry(newEntry.value);
    newEntry.value = Entry.new();
}
</script>

<template>
    <v-card class="ma-6">
        <v-card-text>
            <v-table data-test="entries-table" fixed-header :height="tableHeight">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th><input type="checkbox" v-model="selectAll" /></th>
                            <th class="text-left">To-Do</th>
                            <th class="text-left">Expiration</th>
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td />
                            <td>
                                <TodoEntry
                                    v-model="newEntry.text"
                                    data-test="new-entry-field"
                                    edit
                                    :entry="newEntry"
                                    persistent-placeholder
                                    placeholder="New Entry..."
                                    @submit="storeEntry"
                                />
                            </td>
                            <td>
                                <DateTimePicker
                                    v-model="newEntry.expires_at"
                                    data-test="new-entry-expires-at"
                                    edit
                                    :entry="newEntry"
                                    @submit="storeEntry"
                                />
                            </td>
                            <td class="inline-flex space-x-2 px-3 py-2 whitespace-no-wrap">
                                <v-btn
                                    data-test="new-entry-button"
                                    icon="mdi-plus-thick"
                                    color="success"
                                    size="x-small"
                                    @click="storeEntry"
                                />
                            </td>
                        </tr>
                        <tr v-for="entry in entriesSortedByCreatedAtDesc" :key="entry.uuid">
                            <td>
                                <v-checkbox
                                    data-test="complete-checkbox"
                                    hide-details
                                    :model-value="entry.completed_at !== null"
                                    :name="entry.uuid"
                                    @change="
                                        entry.isComplete()
                                            ? store.incompleteEntry(entry)
                                            : store.completeEntry(entry)
                                    "
                                />
                            </td>
                            <td>
                                <TodoEntry
                                    v-model="entry.text"
                                    :edit="edit === entry.uuid"
                                    :entry="entry"
                                    @submit="updateEntry(entry)"
                                />
                            </td>
                            <td>
                                <DateTimePicker
                                    v-model="entry.expires_at"
                                    :edit="edit === entry.uuid"
                                    :entry="entry"
                                    @submit="updateEntry(entry)"
                                />
                            </td>
                            <td nowrap>
                                <v-btn
                                    data-test="edit-button"
                                    icon="mdi-pencil"
                                    color="primary"
                                    size="x-small"
                                    @click="editEntry(entry)"
                                />
                                <v-btn
                                    data-test="duplicate-button"
                                    icon="mdi-content-duplicate"
                                    color="primary"
                                    size="x-small"
                                    @click="store.duplicateEntry(entry)"
                                />
                                <v-btn
                                    data-test="remove-button"
                                    icon="mdi-delete-forever"
                                    color="error"
                                    size="x-small"
                                    @click="store.deleteEntry(entry)"
                                />
                            </td>
                        </tr>
                    </tbody>

                    <tfoot v-if="store.selections.length > 0" class="text-left">
                        <tr>
                            <td />
                            <th colspan="2" class="font-medium p-3">
                                {{ store.countItemsSelected }}
                                {{ pluralize('item', store.countItemsSelected) }} selected
                            </th>
                        </tr>
                    </tfoot>
                </template>
            </v-table>
        </v-card-text>
    </v-card>
</template>
