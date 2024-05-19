import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './components/routes.js';

loadFonts();

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const app = createApp(App);

app.use(vuetify);
app.use(router);

app.mount('#app');
