<script setup>
// import { ref } from 'vue';
// import BreezeApplicationLogo from '@/components/ApplicationLogo.vue';
// import BreezeDropdown from '@/components/Dropdown.vue';
// import BreezeDropdownLink from '@/components/DropdownLink.vue';
// import BreezeNavLink from '@/components/NavLink.vue';
// import BreezeResponsiveNavLink from '@/components/ResponsiveNavLink.vue';
// import { Link } from '@inertiajs/inertia-vue3';

// const showingNavigationDropdown = ref(false);

const links = ['Dashboard', 'Messages', 'Profile', 'Updates'];
</script>

<template>
    <v-app id="inspire">
        <v-app-bar app color="bg-white" flat>
            <v-container class="py-0 fill-height">
                <v-avatar class="mr-10" color="grey-darken-1" size="32" />

                <v-btn v-for="link in links" :key="link" text>
                    {{ link }}
                </v-btn>

                <v-spacer></v-spacer>

                <!--
                <v-responsive max-width="260">
                    <v-text-field
                        dense
                        flat
                        hide-details
                        rounded
                        single-line
                        solo-inverted
                        variant="contained"
                    ></v-text-field>
                </v-responsive>
                -->
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list color="transparent">
                                <v-list-item v-for="n in 5" :key="n" link>
                                    <!--<v-list-item-content>-->
                                    <v-list-item-title>List Item {{ n }}</v-list-item-title>
                                    <!--</v-list-item-content>-->
                                </v-list-item>

                                <v-divider class="my-2" />

                                <v-list-item link color="text-grey-lighten-4">
                                    <!--<v-list-item-content>-->
                                    <v-list-item-title>Refresh</v-list-item-title>
                                    <!--</v-list-item-content>-->
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet min-height="70vh" rounded="lg" class="pb-1">
                            <slot />
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
