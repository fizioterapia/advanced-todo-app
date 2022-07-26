import { createApp } from 'vue'
import App from './App.vue'
import router from './_router'
import store from './_store'

createApp(App).use(store).use(router).mount('#app')
