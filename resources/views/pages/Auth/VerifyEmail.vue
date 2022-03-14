<script setup>
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { computed } from 'vue';

const props = defineProps({
    status: String,
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template layout="Public">
    <Head title="Email Verification" />

    <div class="mb-4 text-grey-darken-3" style="max-width: 400px">
        Thanks for signing up! Before getting started, could you verify your email address by
        clicking on the link we just emailed to you? If you didn't receive the email, we will gladly
        send you another.
    </div>

    <div class="mb-4 font-weight-medium text-green-darken-3" v-if="verificationLinkSent">
        A new verification link has been sent to the email address you provided during registration.
    </div>

    <form @submit.prevent="submit">
        <div class="mt-8 d-flex align-center justify-space-around">
            <v-btn :disabled="form.processing" type="submit">Resend Verification Email</v-btn>

            <Link
                as="button"
                class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text ml-4"
                :href="route('logout')"
                method="post"
                type="button"
            >
                <div class="v-btn__overlay"></div>
                Log Out
            </Link>
        </div>
    </form>
</template>
