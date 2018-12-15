import Api from '@/services/Api'

export default {
  fetchCats () {
    return Api().get('cats')
  },
  downloadCat (id) {
    return Api().get('download_cat/' + id)
  }
}
