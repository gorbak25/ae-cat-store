// TODO: store is currently unused, but added for future convenience
import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    public_key: undefined,
    private_key: undefined,
    authorization_signature: undefined,
    authorized: false
  },
  mutations: {
    configure_sdk (state, {host, port}) {

    },
    set_wallet (state, {pub, priv}) {
    }
  },
  plugins: [new VuexPersistence().plugin]
})

export default store
