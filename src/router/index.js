import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Search from '@/components/Search'

Vue.use(Router)
Vue.use(VueSession)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/page/:page',
      name: 'Home.page',
      component: Home
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      component: Search
    },
    {
      path: '/search/:keyword/:page',
      name: 'Search.page',
      component: Search
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:userID',
      name: 'Profile',
      component: Profile
    }
  ]
})
