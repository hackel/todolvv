<script setup lang="ts">
import Default from '@/layouts/Default.vue';
</script>

<template>
    <Default>
        <v-col cols="2">
            <v-sheet rounded="lg">
                <slot name="sidebar" />
            </v-sheet>
        </v-col>

        <v-col>
            <v-sheet min-height="70vh" rounded="lg" class="pb-1">
                <slot />
            </v-sheet>
        </v-col>
    </Default>
</template>
