<script setup lang="ts">
import { computed } from 'vue';
import Entry from '@scripts/models/Entry';
import { Temporal } from '@js-temporal/polyfill';

const props = defineProps({
    edit: { type: Boolean, default: false },
    entry: { type: Entry, required: true },
    modelValue: { type: Temporal.Instant, required: false },
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: Temporal.Instant | null): void;
    (e: 'submit'): void;
}>();

/**
 * Convert to/from plain datetime format used by input type=datetime-local.
 */
const inputValue = computed({
    get(): string {
        if (!props['modelValue']) {
            return '';
        }

        let instant = props['modelValue'];

        return Temporal.Now.timeZone()
            .getPlainDateTimeFor(instant)
            .toString({ smallestUnit: 'minute' });
    },
    set(value: string) {
        let instant;
        if (value) {
            let dateTime = Temporal.PlainDateTime.from(value);
            instant = Temporal.Now.timeZone().getInstantFor(dateTime);
        } else {
            instant = null;
        }

        return emit(`update:modelValue`, instant);
    },
});

const today = computed(Temporal.Now.plainDateISO);

const labelFormatter = new Intl.DateTimeFormat(undefined, {
    // weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: Temporal.Now.timeZone().toString(),
});

function formatLabel(instant: Temporal.Instant | null): string {
    if (!instant) {
        return '';
    }

    return labelFormatter.format(new Date(instant.epochMilliseconds));
}
</script>

<template>
    <v-text-field
        v-if="edit"
        v-model="inputValue"
        :autocomplete="false"
        data-test="datetime-field"
        density="compact"
        hide-details
        :min="today"
        rounded
        single-line
        type="datetime-local"
        variant="contained"
        v-on:keyup.enter="emit('submit')"
    ></v-text-field>

    <div
        v-else
        data-test="datetime-text"
        v-text="formatLabel(modelValue)"
        :class="{ 'text-decoration-line-through': entry.completed_at }"
    />
</template>

<style scoped>
.v-input {
    max-width: 150px;
}

.v-input:deep(input) {
    font-size: 0.8em;
    padding: 4px;
}
</style>
