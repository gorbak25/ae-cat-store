import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Discover from '@/components/Discover'
import Buy from '@/components/Buy'
import Wallet from '@/components/Wallet'
import Node from '@/components/Node'
import store from '@/store'

Vue.use(Router)

const ifFullyConfigured = (to, from, next) => {
  if (store.state.authorized) {
    if (store.state.local_node_configured) {
      next()
      return
    }
    next('/node')
    return
  }
  next('/wallet')
}

const ifPartiallyConfigured = (to, from, next) => {
  if (store.state.authorized) {
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
      beforeEnter: ifFullyConfigured
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/node',
      name: 'Node',
      component: Node,
      beforeEnter: ifPartiallyConfigured
    }
  ]
})
