<script setup>
import { Link } from '@inertiajs/inertia-vue3';

const props = defineProps(['href', 'active']);
</script>

<template>
    <Link :href="href" class="nav-link px-1 pt-1 font-weight-medium" :class="{ active }">
        <slot />
    </Link>
</template>

<style scoped>
:root {
    --indigo-400: rgb(129 140 248);
    --indigo-700: rgb(165 180 252);
    --gray-300: rgb(209 213 219);
    --gray-500: rgb(107 114 128);
    --gray-700: rgb(55 65 81);
}

.nav-link {
    border-bottom: 2px solid transparent;
    font-size: 0.875rem; /* 14px */
    line-height: 1.25rem; /* 20px */
    color: var(--gray-500);
    text-decoration: none;
}

.nav-link:focus {
    outline: none;
    border-color: var(--indigo-700);
}

.active {
    border-color: var(--indigo-400);
    color: rgb(17 24 39);
}

.active:hover,
.active:focus {
    color: var(--gray-700);
    border-color: var(--gray-300);
}
</style>
