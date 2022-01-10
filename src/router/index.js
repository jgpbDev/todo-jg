import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Tasks from '../views/Tasks.vue'
import Team from '../views/Team.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  }, 
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router