import './bootstrap';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { createPinia } from 'pinia';
import { createApp, h } from 'vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { importPageComponent } from './vite/import-page-component';

void loadFonts();

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel 9 To-Do List';

void createInertiaApp({
    title: title => `${title} - ${appName}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TS2339: Property 'glob' does not exist on type 'ImportMeta'.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
    resolve: name => importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
    setup({ el, app, props, plugin }) {
        // eslint-disable-next-line vue/component-api-style
        createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(createPinia())
            .use(vuetify)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore route is set externally in Blade template.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            .mixin({ methods: { route } })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
