<script setup lang="ts">
import { Link, usePage } from '@inertiajs/inertia-vue3';
import { computed } from 'vue';
import Autocomplete from '@/components/Autocomplete.vue';
import NavLink from '@/components/NavLink.vue';

const user = computed(() => usePage().props.value.auth?.user);

const navLinks = user.value
    ? [
          { label: 'Home', route: 'home' },
          { label: 'Dashboard', route: 'dashboard' },
      ]
    : [
          { label: 'Home', route: 'home' },
          { label: 'Login', route: 'login' },
          { label: 'Register', route: 'register' },
      ];
</script>

<template>
    <v-app id="inspire">
        <v-app-bar app color="bg-white" flat>
            <v-container class="d-flex py-0 fill-height">
                <v-btn v-for="link in navLinks" :key="link" text>
                    <NavLink :href="route(link.route)" :active="route().current(link.route)">
                        {{ link.label }}
                    </NavLink>
                </v-btn>

                <v-spacer />

                <v-responsive v-if="user" class="search" max-width="260">
                    <Autocomplete />
                </v-responsive>

                <v-menu v-if="user" offset-y>
                    <template #activator="{ props }">
                        <v-btn dark icon v-bind="props" class="profile mx-4">
                            <v-avatar color="grey-darken-1" size="32" />
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item><v-list-item-title>Profile</v-list-item-title></v-list-item>
                        <v-divider />
                        <v-list-item>
                            <v-list-item-title>
                                <Link :href="route('logout')" method="post" as="button">
                                    Log Out
                                </Link>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row justify="center">
                    <slot />
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
.profile {
    margin-top: -7px;
}

.search {
    margin-top: -6px;
    overflow: visible;
}
</style>
