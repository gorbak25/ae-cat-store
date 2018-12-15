<template>
  <div class="home" style="margin-top: 10%">

    <b-alert variant="danger"
             dismissible
             :show="show_error"
             @dismissed="show_error=false">
      {{error_message}}
    </b-alert>

    <h1>Node Configuration</h1>
    Node HTTP API
    <b-form-input v-model="node_http_api" type="text"></b-form-input><br>

    Node Internal HTTP API
    <b-form-input v-model="node_internal_http_api" type="text"></b-form-input><br>

    Network ID
    <b-form-input disabled v-model="node_network_name" type="text"></b-form-input><br>

    Node channel websocket API
    <b-form-input v-model="node_channel_websocket_api" type="text"></b-form-input><br>

    Node channel noise host
    <b-form-input v-model="node_channel_noise_host" type="text"></b-form-input><br>

    Node channel noise port
    <b-form-input v-model="node_channel_noise_port" type="text"></b-form-input><br>

    <b-btn variant="primary" @click="set_configuration()">Set configuration</b-btn>

  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import store from '@/store'
  // import Account from '@aeternity/aepp-sdk/es/account/memory.js'
  // import * as Crypto from '@aeternity/aepp-sdk/es/utils/crypto'

  export default {
    name: 'Wallet',
    data () {
      return {
        node_http_api: '',
        node_internal_http_api: '',
        node_network_name: 'ae_uat',
        node_channel_websocket_api: '',
        node_channel_noise_host: '',
        node_channel_noise_port: '',
        show_error: false,
        error_message: ''
      }
    },
    mounted () {
      this.node_http_api = store.state.node_http_api
      this.node_internal_http_api = store.state.node_internal_http_api
      this.node_channel_websocket_api = store.state.node_channel_websocket_api
      this.node_channel_noise_host = store.state.node_channel_noise_host
      this.node_channel_noise_port = store.state.node_channel_noise_port
    },
    methods: {
      check_configuration () {

      }
    }
  }
</script>
