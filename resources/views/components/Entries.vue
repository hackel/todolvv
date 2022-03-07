<script setup lang="ts">
import { computed, ref } from 'vue';
import Entry from '@scripts/models/Entry';
import TodoEntry from '@/components/TodoEntry.vue';
import { useStore } from '@scripts/store';
import pluralize from 'pluralize';
import { orderBy } from 'lodash-es';

const store = useStore();

['Test entry 1', 'Test entry 2', 'Test entry 3']
    .map(v => Entry.new({ text: v }))
    .forEach(store.addEntry);

const newTodoEntry = ref<InstanceType<typeof TodoEntry> | null>(null);
const selectAll = ref(false);
const edit = ref<string | null>(null);

const tableHeight = computed(() => (store.entries.length > 10 ? '600px' : undefined));

const entriesSortedByDate = computed((): Entry[] => {
    return orderBy(store.entries, 'created_at', 'desc');
});

function addEntry(entry: Entry) {
    store.addEntry(entry);
}

function editEntry(entry: Entry) {
    edit.value = entry.id;
}

function updateEntry(entry: Entry) {
    store.updateEntry(entry);
    edit.value = null;
}
</script>

<template>
    <v-card class="ma-6">
        <v-card-text>
            <v-table fixed-header :height="tableHeight">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th><input type="checkbox" v-model="selectAll" /></th>
                            <th class="text-left">To-Do</th>
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td />
                            <td>
                                <TodoEntry
                                    ref="newTodoEntry"
                                    edit
                                    :entry="Entry.new()"
                                    @update="store.addEntry"
                                />
                            </td>
                            <td class="inline-flex space-x-2 px-3 py-2 whitespace-no-wrap">
                                <v-btn
                                    icon="mdi-plus-thick"
                                    color="success"
                                    size="x-small"
                                    @click="newTodoEntry?.update"
                                />
                            </td>
                        </tr>
                        <tr v-for="entry in entriesSortedByDate" :key="entry.id">
                            <td>
                                <input
                                    :name="entry.id"
                                    type="checkbox"
                                    v-model="entry.completed_at"
                                />
                            </td>
                            <td>
                                <TodoEntry
                                    :edit="edit === entry.id"
                                    :entry="entry"
                                    @update="updateEntry($event)"
                                />
                            </td>
                            <td>
                                <v-btn
                                    icon="mdi-pencil"
                                    color="primary"
                                    size="x-small"
                                    @click="editEntry(entry)"
                                />
                                <v-btn
                                    icon="mdi-content-duplicate"
                                    color="primary"
                                    size="x-small"
                                    @click="store.duplicateEntry(entry)"
                                />
                                <v-btn
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
