<script setup lang="ts">
import Entry from '@scripts/models/Entry';

defineProps({
    entry: { type: Entry, required: true },
});
</script>

<template>
    <div>Here is the entry:</div>
    <pre>{{ entry }}</pre>
</template>

<style scoped></style>
