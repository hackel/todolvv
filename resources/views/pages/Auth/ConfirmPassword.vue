<script setup>
import BreezeValidationErrors from '@/components/ValidationErrors.vue';
import { Head, useForm } from '@inertiajs/inertia-vue3';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    });
};
</script>

<template layout="Public">
    <Head title="Confirm Password" />

    <div class="mb-4 text-gray-600" style="width: 400px">
        This is a secure area of the application. Please confirm your password before continuing.
    </div>

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
        <v-text-field
            type="password"
            v-model="form.password"
            density="comfortable"
            label="Password"
            variant="underlined"
            required
            autocomplete="current-password"
            :autofocus="true"
        />

        <div class="d-flex align-center justify-end mt-4">
            <v-btn color="primary" :disabled="form.processing" type="submit">Confirm</v-btn>
        </div>
    </form>
</template>
