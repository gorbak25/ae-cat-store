// TODO: store is currently unused, but added for future convenience
import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import * as Crypto from '@aeternity/aepp-sdk/es/utils/crypto'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    public_key: undefined,
    private_key: undefined,
    authorization_signature: undefined,
    authorized: false,
    local_node_configured: false,
    node_http_api: 'https://sdk-testnet.aepps.com',
    node_internal_http_api: 'https://sdk-testnet.aepps.com',
    node_network_name: 'ae_uat',
    node_channel_websocket_api: '',
    node_channel_noise_host: '',
    node_channel_noise_port: ''
  },
  mutations: {
    configure_sdk (state, {host, port}) {

    },
    set_wallet (state, [pub, priv]) {
      state.public_key = pub
      state.private_key = priv

      const signature = Crypto.sign('Login Token', Crypto.hexStringToByte(state.private_key))
      state.authorization_signature = Crypto.encodeBase64Check(signature)
      state.authorized = true

     // console.log(Crypto.verify('Login Token', Crypto.decodeBase64Check(state.authorization_signature), Crypto.decodeBase58Check(state.public_key.slice(3))))
    },
    delete_wallet (state) {
      state.public_key = undefined
      state.private_key = undefined
      state.authorization_signature = undefined
      state.authorized = false
    }
  },
  plugins: [new VuexPersistence().plugin]
})

export default store
