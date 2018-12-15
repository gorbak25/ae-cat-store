<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top" v-if="['Home'].indexOf($route.name) === -1">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand v-bind:to="'/'">CatStore</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item v-bind:to="'/discover'">Store</b-nav-item>
          <b-nav-item v-bind:to="'/wallet'">Configure Wallet</b-nav-item>
          <b-nav-item v-bind:to="'/node'">Configure Node</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-navbar-nav>
            <b-nav-text v-if="authorized===true" style="margin-right: 20px"> {{account}} </b-nav-text>
            <b-nav-text v-if="authorized===true" style="margin-right: 20px"> {{balance}} AET </b-nav-text>
            <b-nav-text> Channel Balance: </b-nav-text>
          </b-navbar-nav>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>


    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import Chain from '@aeternity/aepp-sdk/es/chain/epoch.js'

export default {
  name: 'App',
  data: {
    account: '',
    authorized: false
  },
  async mounted () {
    const chain = await Chain({
      url: store.state.node_http_api,
      internalUrl: store.state.node_internal_http_api,
      networkId: store.state.node_network_name
    })

    this.account = store.state.public_key.slice(0, 8) + '...'
    this.authorized = store.state.authorized
    this.balance = await chain.balance(store.state.public_key)

    store.watch(state => state.authorized, authorized => {
      this.authorized = authorized
    })

    store.watch(state => state.public_key, publicKey => {
      this.account = publicKey.slice(0, 8) + '...'

      chain.balance(store.state.public_key).then(balance => {
        this.balance = balance
      }).reject(() => { this.balance = 0 })
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
