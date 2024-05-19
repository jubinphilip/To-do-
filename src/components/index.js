import { createRouter, createWebHistory } from 'vue-router'
import AddTask from './AddTask.vue'
import ViewTask from './Viewtask.vue'
import Completed from './Completed.vue'
import Remaining from './Remaining.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/add', component: AddTask },
    { path: '/view', component: ViewTask },
    { path: '/completed', component: Completed },
    { path: '/remaining', component: Remaining }
  ]
})

export default router
