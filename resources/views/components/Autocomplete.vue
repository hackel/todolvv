<script setup lang="ts">
import { usePage } from '@inertiajs/inertia-vue3';
import { useAutocomplete } from '@scripts/util/autocomplete';
import { computed, onMounted } from 'vue';
import { MeiliSearch } from 'meilisearch';
import '@algolia/autocomplete-theme-classic';

const meiliSearchToken = computed<string>(() => usePage().props.value.auth.meiliSearchToken);

const searchClient = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: meiliSearchToken.value,
});

onMounted(() => {
    useAutocomplete(searchClient, {
        container: '#autocomplete',
        placeholder: 'Search your To-Dos...',
    });
});
</script>

<template>
    <div id="autocomplete" />
</template>
