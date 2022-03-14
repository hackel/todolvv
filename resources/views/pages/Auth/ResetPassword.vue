<script setup>
import BreezeValidationErrors from '@/components/ValidationErrors.vue';
import { Head, useForm } from '@inertiajs/inertia-vue3';

const props = defineProps({
    email: String,
    token: String,
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template layout="Public">
    <Head title="Reset Password" />

    <BreezeValidationErrors class="mb-4" />

    <v-form @submit.prevent="submit">
        <v-text-field
            type="email"
            v-model="form.email"
            density="comfortable"
            label="Email"
            clearable
            required
            :autofocus="true"
            autocomplete="username"
            variant="underlined"
        />

        <v-text-field
            type="password"
            v-model="form.password"
            density="comfortable"
            label="New Password"
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

        <div class="d-flex align-center justify-end mt-4">
            <v-btn color="primary" :disabled="form.processing" type="submit">Reset Password</v-btn>
        </div>
    </v-form>
</template>
