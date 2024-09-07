import { router } from '../router'

// Types
import type { App } from 'vue'
import { createPinia } from 'pinia'

export function registerPlugins(app: App) {
  app
    .use(router)
    .use(createPinia())
}
