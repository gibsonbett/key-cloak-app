import { createApp } from 'vue'
import App from './App.vue'
import routes from "./router/index.js"
import "./index.css"

// import { createRouter, createWebHashHistory } from 'vue-router'

// const router = createRouter({
//   // Provide the history implementation to use. We are using the hash history for simplicity here.
//   history: createWebHashHistory(),
//   routes, // short for `routes: routes`
// })

createApp(App).use(routes).mount('#app')