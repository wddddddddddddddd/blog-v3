import { createApp } from 'vue'
import './style.css' // 👈 引入全局样式
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')