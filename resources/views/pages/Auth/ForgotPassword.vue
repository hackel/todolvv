<script setup>
import BreezeValidationErrors from '@/components/ValidationErrors.vue';
import { Head, useForm } from '@inertiajs/inertia-vue3';

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template layout="Public">
    <Head title="Forgot Password" />

    <div class="mb-4 text-sm text-gray-600" style="max-width: 400px">
        Forgot your password? No problem. Just let us know your email address and we will email you
        a password reset link that will allow you to choose a new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
        {{ status }}
    </div>

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
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

        <div class="d-flex align-center justify-end mt-4">
            <v-btn color="primary" :disabled="form.processing" type="submit">
                Email Password Reset Link
            </v-btn>
        </div>
    </form>
</template>
