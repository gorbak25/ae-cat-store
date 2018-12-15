<template>
  <div class="discover">
    <h1>Cats</h1>
    <h2>Browse our exclusive collection of the highest purrity cat pictures!</h2>

    <b-modal ref="showModal" centered size="lg" hide-footer :title="show_modal_data.name">
      <div class="d-block text-center">
        <img v-bind:src="'data:image/jpeg;base64,'+show_modal_data.image" />
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideShowModal">Exit</b-btn>
    </b-modal>

    <div>
      <b-table striped bordered hover :items="cats" :fields="cats_fields">
        <template slot="thumbnail" slot-scope="data">
          <img v-bind:src="'data:image/jpeg;base64,'+data.item.thumbnail" />
        </template>

        <template slot="buy" slot-scope="data">

          <b-btn variant="primary" v-if="data.item.bought===false" v-bind:to="'/buy'">Buy</b-btn>
          <b-btn variant="primary" v-if="data.item.bought===true" @click="showShowModal(data.index)">Show</b-btn>

        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  import CatsService from '@/services/CatsService'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'cats',
    data () {
      return {
        cats: [],
        cats_fields: [
          {
            key: 'name',
            sortable: false,
            'class': 'text-center'
          },
          {
            key: 'description',
            sortable: false,
            'class': 'text-center'
          },
          {
            key: 'price',
            sortable: true,
            'class': 'text-center'
          },
          {
            key: 'thumbnail',
            label: 'Preview',
            sortable: false,
            'class': 'text-center'
          },
          {
            key: 'buy',
            label: 'Action',
            'class': 'text-center'
          }
        ],
        show_modal_data: {name: undefined, image: undefined}
      }
    },
    mounted () {
      this.getCats()
    },
    methods: {
      async getCats () {
        const response = await CatsService.fetchCats()
        this.cats = response.data
        this.cats[0]['bought'] = true
        this.cats[1]['bought'] = true
      },
      async showShowModal (idx) {
        this.show_modal_data.name = this.cats[idx].name
        if (this.cats[idx].picture === undefined) {
          this.show_modal_data.image = undefined
          const response = await CatsService.downloadCat(this.cats[idx]._id)

          this.cats[idx].picture = response.data
          this.show_modal_data.image = this.cats[idx].picture
          console.log(this.show_modal_data.image)
        }

        this.$refs.showModal.show()
      },
      hideShowModal () {
        this.$refs.showModal.hide()
      }
    }
  }
</script>
