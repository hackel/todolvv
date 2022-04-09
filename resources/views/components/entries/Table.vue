<script setup lang="ts">
import { Temporal } from '@js-temporal/polyfill';
import pluralize from 'pluralize';
import { computed, onMounted, ref } from 'vue';
import DateTimePicker from '@/components/DateTimePicker.vue';
import EntryText from '@/components/entries/TextField.vue';
import Entry from '@scripts/models/Entry';
import { useStore } from '@scripts/store';

const store = useStore();

onMounted(async () => {
    await store.getEntries();
});

const newEntry = ref<Entry>(new Entry());
const selectAll = ref(false);
const edit = ref<string | null>(null);

const tableHeight = computed(() => (store.entries.length > 10 ? '600px' : undefined));

const entriesSortedByCreatedAtDesc = computed(() => {
    return [...store.entries].sort((a, b) => Temporal.Instant.compare(b.created_at, a.created_at));
});

function editEntry(entry: Entry) {
    edit.value = entry.uuid;
}

async function updateEntry(entry: Entry) {
    await store.updateEntry(entry);
    edit.value = null;
}

async function storeEntry() {
    await store.addEntry(newEntry.value as Entry);
    // eslint-disable-next-line require-atomic-updates
    newEntry.value = new Entry();
}
</script>

<template>
    <v-table data-test="entries-table" fixed-header :height="tableHeight">
        <template #default>
            <thead>
                <tr>
                    <th><input v-model="selectAll" type="checkbox" /></th>
                    <th style="width: 100%">To-Do</th>
                    <th>Expiration</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td />
                    <td>
                        <EntryText
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
                        <EntryText
                            v-model="entry.text"
                            :edit="edit === entry.uuid"
                            :entry="entry"
                            @submit="updateEntry(entry)"
                        />
                    </td>
                    <td>
                        <DateTimePicker
                            v-model="entry.expires_at"
                            :class="{ 'text-red': entry.isExpired() }"
                            :edit="edit === entry.uuid"
                            :entry="entry"
                            @submit="updateEntry(entry)"
                        />
                    </td>
                    <td nowrap>
                        <v-btn
                            class="mr-1"
                            color="primary"
                            data-test="edit-button"
                            icon="mdi-pencil"
                            size="x-small"
                            @click="editEntry(entry)"
                        />
                        <v-btn
                            class="mr-1"
                            color="primary"
                            data-test="duplicate-button"
                            icon="mdi-content-duplicate"
                            size="x-small"
                            @click="store.duplicateEntry(entry)"
                        />
                        <v-btn
                            color="error"
                            data-test="remove-button"
                            icon="mdi-delete-forever"
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
</template>
