<script setup lang="ts">
import { defineExpose, defineEmits, defineProps, ref } from 'vue';
import Entry from '@scripts/models/Entry';

const props = defineProps({
    edit: { type: Boolean, default: false },
    entry: { type: Entry, required: true },
});

const emit = defineEmits<{
    (e: 'update', value: Entry): void;
}>();

const entryText = ref<string | null>(props.entry.text);

async function update() {
    let entry = props.entry;
    if (entry && entryText.value) {
        entry.text = entryText.value;
        await emit('update', entry);
        entryText.value = null;
    }
}

defineExpose({ update });
</script>

<template>
    <v-text-field
        v-if="edit"
        v-model="entryText"
        :autocomplete="false"
        data-test="new-entry-field"
        density="compact"
        hide-details
        maxlength="16383"
        :persistent-placeholder="true"
        placeholder="Start typing a new to-do entry..."
        required
        single-line
        v-on:keyup.enter="update"
    ></v-text-field>

    <div
        v-else
        v-text="entry.text"
        :class="{ 'text-decoration-line-through': entry.completed_at }"
    />
</template>

<!--
<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
-->
