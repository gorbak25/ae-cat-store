import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Discover from '@/components/Discover'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/discover',
      name: 'discover',
      component: Discover
    }
  ]
})
