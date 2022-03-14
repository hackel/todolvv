import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import laravel from 'vite-plugin-laravel';
import vue from '@vitejs/plugin-vue';
import inertia from './resources/scripts/vite/inertia-layout';
import vuetify from '@vuetify/vite-plugin';
import path from 'path';

export default defineConfig({
    build: {
        target: 'esnext',
    },
    plugins: [
        inertia(),
        vue(),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
        }),
        laravel({
            postcss: [autoprefixer()],
        }),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/views'),
            '@scripts': path.resolve(__dirname, './resources/scripts'),
        },
        extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
});
