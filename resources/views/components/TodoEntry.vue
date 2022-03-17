<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import Entry from '@scripts/models/Entry';
import { useModelWrapper } from '@scripts/util/modelWrapper';

const props = defineProps({
    edit: { type: Boolean, default: false },
    entry: { type: Entry, required: true },
    modelValue: { type: String, required: true },
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: String): void;
    (e: 'submit'): void;
}>();

const entryText = useModelWrapper<string>(props, emit);
</script>

<template>
    <v-text-field
        v-if="edit"
        v-model="entryText"
        :autocomplete="false"
        data-test="entry-field"
        density="compact"
        hide-details
        maxlength="16383"
        :persistent-placeholder="true"
        required
        rounded
        single-line
        variant="contained"
        v-on:keyup.enter="emit('submit')"
    ></v-text-field>

    <div
        v-else
        data-test="entry-text"
        v-text="entryText"
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
