import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import inertia from './resources/scripts/vite/inertia-layout';
import laravel from 'vite-plugin-laravel';
import path from 'path';
import postcssNesting from 'postcss-nesting';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
    build: {
        target: 'esnext',
    },
    plugins: [
        inertia(),
        laravel({
            postcss: [autoprefixer(), postcssNesting()],
        }),
        vue(),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
        }),
        vueJsx(),
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
