import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/css/style.css'
import AdminApi from '@/plugins/api/admin'
import FrontendApi from '@/plugins/api/frontend'
import store from './store'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App)
    .use(router)
    .use(store);

app.config.globalProperties.adminApi = AdminApi;
app.config.globalProperties.frontendApi = FrontendApi;
app.config.globalProperties.store = store;
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app');
