<script setup>
import BreezeValidationErrors from '@/components/ValidationErrors.vue';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template layout="Public">
    <Head title="Log in" />

    <BreezeValidationErrors class="mb-4" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
        {{ status }}
    </div>

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
            label="Password"
            variant="underlined"
            required
            autocomplete="current-password"
        />

        <v-checkbox
            v-model="form.remember"
            density="comfortable"
            label="Remember me"
            name="remember"
        />

        <div class="d-flex align-center justify-space-around">
            <Link
                v-if="canResetPassword"
                as="button"
                class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
                :href="route('password.request')"
                type="button"
            >
                <div class="v-btn__overlay"></div>
                Forgot your password?
            </Link>

            <v-btn class="ml-4" color="primary" :disabled="form.processing" type="submit">
                Log in
            </v-btn>
        </div>
    </v-form>
</template>
