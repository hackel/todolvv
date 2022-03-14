<script setup lang="ts">
import Default from '@/layouts/Default.vue';
</script>

<template>
    <Default>
        <v-col>
            <v-sheet min-height="70vh" rounded="lg" class="pb-1">
                <slot />
            </v-sheet>
        </v-col>
    </Default>
</template>
