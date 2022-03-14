<script setup lang="ts">
import LaravelLogo from '@/components/LaravelLogo.vue';
import InertiaLogo from '@/components/InertiaLogo.vue';
import { version as vueVersion } from 'vue';
import { version as vuetifyVersion } from './../../../node_modules/vuetify/lib/entry-bundler.mjs';

defineProps<{
    versions: {
        php: string;
        laravel: string;
    };
}>();
</script>

<template layout="FullWidth">
    <div class="d-flex align-items-top align-items-sm-center justify-content-center py-4 pt-sm-0">
        <div class="px-sm-6 px-lg-8">
            <div
                class="d-flex justify-content-center align-items-center mx-6 mt-8"
                style="max-width: 600px"
            >
                <LaravelLogo class="text-red-darken-1" />
                <InertiaLogo class="ml-12 text-deep-purple-lighten-2" />
            </div>

            <h1 class="mt-6 mb-3 text-h4 text-sm-h3">TodoLVV</h1>

            <p class="my-3 text-body-1">
                This is a simple To-Do list app I created to demonstrate some features and best
                practices with the Laravel-Vue-Vite (or Vuetify) stack. It is inspired by TodoMVC,
                but does not use code from any related project. TodoLVV was created by
                <a href="https://www.github.com/hackel">Ryan Hayle</a>
                .
            </p>

            <p class="my-3 text-body-1">This project makes use of the following packages:</p>

            <dl class="text-body-1">
                <dt class="mt-3">Backend</dt>
                <dd>
                    <ul class="text-body-2 pl-6">
                        <li>PHP {{ versions.php }}</li>
                        <li>Laravel {{ versions.laravel }}</li>
                        <li>Pest 1.2 (Unit and Feature tests)</li>
                    </ul>
                </dd>

                <dt class="mt-3">Frontend</dt>
                <dd>
                    <ul class="text-body-2 pl-6">
                        <li>Vue {{ vueVersion }}</li>
                        <li>Vite 2</li>
                        <li>Inertia.js 0.11</li>
                        <li>Pinia 2 (Vuex 5)</li>
                        <li>Vuetify {{ vuetifyVersion }}</li>
                        <li>Cypress 9.5 (Component and E2E tests)</li>
                    </ul>
                </dd>
            </dl>
        </div>
    </div>
</template>
