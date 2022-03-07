<script setup>
// import BreezeAuthenticatedLayout from '@/layouts/Authenticated.vue';
import VuetifyAuthenticatedLayout from '@/layouts/VuetifyAuthenticated.vue';
import { Head } from '@inertiajs/inertia-vue3';
import Todo from '@/components/Todo.vue';
</script>

<template>
    <Head title="Dashboard" />

    <VuetifyAuthenticatedLayout>
        <p class="pa-6">
            This is a simple To-Do list app I created to demonstrate some of the features of this
            stack consisting of Laravel 9, Vue 3, Vite, and Pinia (Vuex 5).
        </p>

        <Todo />
        <!--
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-8">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <Todo class="pb-6" />
                    </div>
                </div>
            </div>
        </div>
        -->
    </VuetifyAuthenticatedLayout>
</template>
