<script setup lang="ts">
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Default from '@/layouts/Default.vue';
import { Link } from '@inertiajs/inertia-vue3';
</script>

<template>
    <Default>
        <v-col sm="auto">
            <v-sheet rounded="lg" class="pb-1">
                <div class="ma-6 pt-6">
                    <div class="text-center mb-6">
                        <Link href="/">
                            <ApplicationLogo class="logo text-grey-darken-1" />
                        </Link>
                    </div>

                    <slot />
                </div>
            </v-sheet>
        </v-col>
    </Default>
</template>

<style scoped>
.logo {
    width: 5rem;
    height: 5rem;
    fill: currentColor;
    color: rgb(107 114 128);
}

.v-col {
    min-width: 400px;
}
</style>
