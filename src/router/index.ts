import TicTacToe from "@/pages/TicTacToe.vue"
import { createMemoryHistory, createRouter } from "vue-router"

const routes = [
  { path: '/', component: TicTacToe },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
