<script setup lang="ts">
import TodoEntry from '@/components/TodoEntry/TodoEntry.vue';
import Sidebar from '@/layouts/Sidebar';
import { Head } from '@inertiajs/inertia-vue3';
import { useStore } from '@scripts/store';
import { computed } from 'vue';
import Entry from '@scripts/models/Entry';

const store = useStore();

const props = defineProps({
    entry: { type: Object, required: true },
});

const hydratedEntry = computed(() => Entry.from(props.entry.data));
</script>

<template>
    <Head title="To-Do Entry" />

    <Sidebar>
        <template #sidebar>
            <v-list color="transparent">
                <v-list-item v-for="n in 6" :key="n" link>
                    <v-list-item-title>List Item {{ n }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </template>

        <TodoEntry :entry="hydratedEntry" />
    </Sidebar>
</template>

<style scoped></style>
