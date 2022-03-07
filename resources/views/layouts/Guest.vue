<script setup>
import BreezeApplicationLogo from '@/components/ApplicationLogo.vue';
import { Link } from '@inertiajs/inertia-vue3';
</script>

<template>
    <div class="min-h-screen d-flex flex-column justify-sm-center align-center pt-6 pt-sm-0 bg-grey-lighten-5 bg-gray-100">
        <div>
            <Link href="/">
                <BreezeApplicationLogo class="logo w-20 h-20 fill-current text-grey-darken-1 text-gray-500" />
            </Link>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>

<style>
.min-h-screen {
    min-height: 100vh;
}

.logo {
    width: 5rem;
    height: 5rem;
    fill: currentColor;
    color: rgb(107 114 128);
}

.text-gray-500 {
    color: rgb(243 244 246);
}

.w-full {
    width: 100%;
}

/* sm breakpoint only:
.max-w-md {
    max-width: 28rem; !* 448px *!
}
*/
</style>
