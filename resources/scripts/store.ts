import { defineStore } from 'pinia';
import api from '@scripts/api';
import Entry from '@scripts/models/Entry';

export const useStore = defineStore('main', {
    state: () => ({
        entries: [] as Entry[],
        selections: [] as string[],
    }),
    getters: {
        countItemsSelected: state => state.selections.length,
    },
    actions: {
        async getEntries() {
            const entries = await api.entries.index();
            this.entries = Entry.collection(entries.data);
        },

        async addEntry(entry: Entry) {
            const newEntry = await api.entries.store(entry);
            this.entries.push(Entry.from(newEntry.data));
        },

        async completeEntry(entry: Entry) {
            const updatedEntry = await api.entries(entry.uuid).update(entry.complete());
            Object.assign(entry, updatedEntry);
        },

        async incompleteEntry(entry: Entry) {
            const updatedEntry = await api.entries(entry.uuid).update(entry.incomplete());
            Object.assign(entry, updatedEntry);
        },

        async updateEntry(entry: Entry) {
            const updatedEntry = await api.entries(entry.uuid).update(entry);
            Object.assign(entry, updatedEntry);
        },

        async duplicateEntry(entry: Entry) {
            return this.addEntry(entry);
        },

        async deleteEntry(entry: Entry) {
            await api.entries(entry.uuid).destroy();

            const pos = this.entries.indexOf(entry);
            if (pos !== -1) {
                this.entries.splice(pos, 1);
            }
        },
    },
});
