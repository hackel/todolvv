import { createApp } from 'vue';
import App from './App.vue';
// @ts-ignore
import vuetify from './plugins/vuetify';
// @ts-ignore
import { loadFonts } from './plugins/webfontloader';

loadFonts();

const app = createApp(App);

app.use(vuetify);
app.mount('#app');
