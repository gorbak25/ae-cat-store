<template>
  <div class="home" style="margin-top: 10%">

    <b-alert variant="danger"
             dismissible
             :show="show_error"
             @dismissed="show_error=false">
      {{error_message}}
    </b-alert>

    <h1>Wallet Configuration</h1>

    Ae public key:
    <b-form-input v-model="account_pubkey" type="text"></b-form-input><br>

    Ae private key:
    <b-form-input v-model="account_priv_key" type="text"></b-form-input><br>

    <b-btn variant="primary" @click="save_wallet()">Save wallet</b-btn>
    <b-btn variant="primary" @click="random_wallet()">Generate random wallet</b-btn>
    <b-btn variant="primary" @click="delete_wallet()">Delete wallet</b-btn><br><br>

  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import store from '@/store'
  import router from '@/router/index'
  // import Account from '@aeternity/aepp-sdk/es/account/memory.js'
  import * as Crypto from '@aeternity/aepp-sdk/es/utils/crypto'

  export default {
    name: 'Wallet',
    data () {
      return {
        account_pubkey: '',
        account_priv_key: '',
        show_error: false,
        error_message: ''
      }
    },
    mounted () {
      this.account_pubkey = store.state.public_key
      this.account_priv_key = store.state.private_key
    },
    methods: {
      async random_wallet () {
        const keys = Crypto.generateKeyPair(false)
        this.account_priv_key = keys.secretKey
        this.account_pubkey = keys.publicKey
        await this.save_wallet()
      },
      async delete_wallet () {
        store.commit('delete_wallet')
        this.account_pubkey = ''
        this.account_priv_key = ''
      },
      async save_wallet () {
        this.show_error = false
        if (!this.account_pubkey.startsWith('ak_')) {
          this.error_message = 'Public key must start with ak_'
          this.show_error = true
          return
        }

        var decodedPubkey
        try {
          decodedPubkey = Crypto.decodeBase58Check(this.account_pubkey.slice(3))
        } catch (e) {
          this.error_message = 'Invalid public key'
          this.show_error = true
          return
        }

        var re = /^[0-9A-Fa-f]*$/
        if (!re.test(this.account_priv_key)) {
          this.error_message = 'Invalid private key'
          this.show_error = true
          return
        }

        const decodedPrivkey = Crypto.hexStringToByte(this.account_priv_key)
        if (!Crypto.isValidKeypair(decodedPrivkey, decodedPubkey)) {
          this.error_message = 'Private key does not match public key'
          this.show_error = true
          return
        }
        store.commit('set_wallet', [this.account_pubkey, this.account_priv_key])
        router.push('/node')
      }
    }
  }
</script>
