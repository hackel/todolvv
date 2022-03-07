import './bootstrap';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { importPageComponent } from './vite/import-page-component';
// @ts-ignore
import vuetify from './plugins/vuetify';
// @ts-ignore
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import 'temporal-polyfill/global';

loadFonts();

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel 9 To-Do List';

// noinspection JSIgnoredPromiseFromCall
createInertiaApp({
    title: title => `${title} - ${appName}`,
    // @ts-ignore TS2339: Property 'glob' does not exist on type 'ImportMeta'.
    resolve: name => importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
    setup({ el, app, props, plugin }) {
        createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(createPinia())
            .use(vuetify)
            // @ts-ignore route is set externally in Blade template.
            .mixin({ methods: { route } })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
