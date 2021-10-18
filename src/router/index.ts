import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import UserLayout from '@/@User/UserLayout.vue'
import Home from "@/@User/views/Home.vue";
import Login from '@/@Auth/components/Login.vue'
import Register from '@/@Auth/components/Register.vue'
import AuthLayout from '@/@Auth/AuthLayout.vue'
import Users from "@/@User/views/Users.vue";
import {AuthService} from "@/@Core/services/Auth.service";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthLayout,
    redirect: '/home',
    beforeEnter: async (to, from, next) => {
      if (await AuthService.isAuthenticated()) {
        next({name: 'App'})
      } else {
        next()
      }
    },
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/auth/register',
        name: 'register',
        component: Register,
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/auth/login'
      }
    ]
  },
  {
    path: '/app',
    name: 'App',
    component: UserLayout,
    redirect: '/app/home',
    beforeEnter: async (to, from, next) => {
      if (await AuthService.isAuthenticated()) {
        next()
      } else {
        next({name: 'Auth'})
      }
    },
    children: [
      {
        path: '/app/home',
        name: 'home',
        component: Home,
      },
      {
        path: '/app/users',
        name: 'users',
        component: Users,
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/app/home'
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
