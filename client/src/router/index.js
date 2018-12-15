import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Discover from '@/components/Discover'
import Buy from '@/components/Buy'
import Wallet from '@/components/Wallet'
import store from '@/store'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  if (store.authorized) {
    next()
    return
  }
  next('/wallet')
}

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
      name: 'Discover',
      component: Discover
    },
    {
      path: '/buy/:id',
      name: 'Buy',
      component: Buy,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    }
  ]
})
