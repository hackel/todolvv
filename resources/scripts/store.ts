import { defineStore } from 'pinia';
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
        addEntry(entry: Entry) {
            this.entries.push(entry);
        },

        completeEntry(entry: Entry) {
            entry.complete();
        },

        updateEntry(entry: Entry) {
            let pos = this.entries.indexOf(entry);
            this.entries[pos] = entry;
        },

        duplicateEntry(entry: Entry) {
            let pos = this.entries.indexOf(entry);
            this.entries.splice(pos, 0, entry.clone());
        },

        deleteEntry(entry: Entry) {
            let pos = this.entries.indexOf(entry);
            if (pos !== -1) {
                this.entries.splice(pos, 1);
            }
        },
    },
});
