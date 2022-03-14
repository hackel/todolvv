<script setup>
import BreezeValidationErrors from '@/components/ValidationErrors.vue';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template layout="Public">
    <Head title="Register" />

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
        <v-text-field
            v-model="form.name"
            density="comfortable"
            label="Name"
            clearable
            required
            :autofocus="true"
            autocomplete="name"
            variant="underlined"
        />

        <v-text-field
            type="email"
            v-model="form.email"
            density="comfortable"
            label="Email"
            clearable
            required
            autocomplete="username"
            variant="underlined"
        />

        <v-text-field
            type="password"
            v-model="form.password"
            density="comfortable"
            label="Password"
            variant="underlined"
            required
            autocomplete="new-password"
        />

        <v-text-field
            type="password"
            v-model="form.password_confirmation"
            density="comfortable"
            label="Confirm Password"
            variant="underlined"
            required
            autocomplete="new-password"
        />

        <div class="d-flex align-center justify-space-around">
            <Link
                as="button"
                class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
                :href="route('login')"
                type="button"
            >
                <div class="v-btn__overlay"></div>
                Already registered?
            </Link>

            <v-btn class="ml-4" color="primary" :disabled="form.processing" type="submit">
                Register
            </v-btn>
        </div>
    </form>
</template>
