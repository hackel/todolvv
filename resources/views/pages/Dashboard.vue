<script setup>
import Todo from '@/components/Todo.vue';
import Sidebar from '@/layouts/Sidebar';
import { Head } from '@inertiajs/inertia-vue3';
import { useStore } from '@scripts/store';

const store = useStore();
</script>

<template>
    <Head title="Dashboard" />

    <Sidebar>
        <template #sidebar>
            <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                    <!--<v-list-item-content>-->
                    <v-list-item-title>List Item {{ n }}</v-list-item-title>
                    <!--</v-list-item-content>-->
                </v-list-item>

                <v-divider class="my-2" />

                <v-list-item link color="text-grey-lighten-4">
                    <!--<v-list-item-content>-->
                    <v-list-item-title @click="store.getEntries()">Refresh</v-list-item-title>
                    <!--</v-list-item-content>-->
                </v-list-item>
            </v-list>
        </template>

        <p class="pa-6 pb-0">Have fun organizing your To-Do list!</p>

        <Todo />
    </Sidebar>
</template>
