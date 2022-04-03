<script setup lang="ts">
import EntriesTable from '@/components/entries/Table';
import SidebarLayout from '@/layouts/Sidebar';
import { Head } from '@inertiajs/inertia-vue3';
import { useStore } from '@scripts/store';

const store = useStore();
</script>

<template>
    <Head title="Dashboard" />

    <SidebarLayout>
        <template #sidebar>
            <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                    <v-list-item-header>
                        <v-list-item-title>List Item {{ n }}</v-list-item-title>
                    </v-list-item-header>
                </v-list-item>

                <v-divider class="my-2" />

                <v-list-item link>
                    <v-list-item-header>
                        <v-list-item-title @click="store.getEntries()">Refresh</v-list-item-title>
                    </v-list-item-header>
                </v-list-item>
            </v-list>
        </template>

        <v-card class="ma-1">
            <v-card-header>
                <v-card-header-text>To-Do Entries</v-card-header-text>
            </v-card-header>

            <EntriesTable />
        </v-card>
    </SidebarLayout>
</template>
