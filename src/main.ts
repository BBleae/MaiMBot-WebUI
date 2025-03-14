import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App)

// Register all Element Plus icons globally
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`ElIcon${key}`, component)
}

app.use(ElementPlus)
app.mount('#app')

console.log('Hello, World!')
