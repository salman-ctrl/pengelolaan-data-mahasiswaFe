import './style.css'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routers/index';
import App from './App.vue';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'



// Buat instance Vue
const app = createApp(App);

// Gunakan Pinia untuk state management
app.use(createPinia());

// Gunakan router
app.use(router);

// Mount aplikasi ke div#app
app.mount('#app');

app.use(Toast)