<template>
  <div class="row">
    <notifications group="productDelete" />
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom">
          <h6 class="m-0">Active Product</h6>
        </div>
        <div class="card-body p-0 pb-3 text-center">
          <table class="table mb-0">
            <thead class="bg-light">
              <tr>
                <th scope="col" class="border-0">#</th>
                <th scope="col" class="border-0">Name Product</th>
                <th scope="col" class="border-0">Category</th>
                <th scope="col" class="border-0">Image</th>
                <th scope="col" class="border-0">Brand</th>
                <th scope="col" class="border-0">Total Quantity</th>
                <th scope="col" class="border-0">Price Origin</th>
                <th scope="col" class="border-0">Edit</th>
              </tr>
            </thead>
            <tbody v-for="(product, index) in products" :key="index">
              <tr>
                <td>{{products.indexOf(product) + 1 }}</td>
                <td v-bind:title=product.name_product>{{product.name_product | truncate(30)}}</td>
                <td>{{getCategory(product.id_categories)}}</td>
                <td><img v-bind:src="$store.state.apiApp + 'products/' + product.image_main" v-if="product.image_main" alt="" style="max-width: 80px"></td>
                <td>{{product.brand}}</td>
                <td>{{product.total_quantity}}</td>
                <td>{{product.price_origin}}</td>
                <td>{{products[0].name_category}}
                  <span style="cursor: pointer;"><nuxt-link :to='{path: "/admin/products/images/"+product.link}'>Images</nuxt-link></span>
                  <span><nuxt-link :to='{path: "/admin/products/detail/"+product.link}'>Update</nuxt-link></span>
                  <span @click="deleteProduct(product.id_number)"><nuxt-link to="#">Delete</nuxt-link></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="paging-page">
        <paginate v-model="page" :page-count="lengthProduct" :click-handler="functionName" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'"> </paginate>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import axios from 'axios'
import SlimDialog from 'v-slim-dialog'
import Notifications from 'vue-notification'
import 'v-slim-dialog/dist/v-slim-dialog.css'
import VueTruncate from "vue-truncate-filter"

Vue.use(SlimDialog)
Vue.use(VueTruncate)
Vue.use(Notifications);

var Paginate = require('vuejs-paginate')
Vue.component('paginate', Paginate)

export default {
  data () {
    return {
      products: [],
      lengthProduct: 0,
      page: 0,
      listCategories: []
    }
  },
  created () {
    this.fetchData()
    
    this.fetCategories();
    
    this.page = Number(this.$route.params.id)
  },
  methods:{
    
    fetchData(){
      if(this.$store.state.userInfo.data.auth_admin === "Y") {
        axios.get(`${this.$store.state.apiLink}/products/list-page-product/${this.$route.params.id}`)
        .then( res => {
            this.products = res.data.data
            this.lengthProduct = Math.ceil(res.data.length / 20)
        })
        .catch(err => console.log(err))
      }
      if(this.$store.state.userInfo.data.auth_admin === "N"){
        axios.post(`${this.$store.state.apiLink}/products/list-product-user/${this.$route.params.id}`, {"user_id": this.$store.state.userInfo.data.id_number})
        .then(res => {
          this.products = res.data.data
          this.lengthProduct = Math.ceil(res.data.length / 20)
        })
        .catch(err => console.log(err))
      }
    },

    fetCategories(){
      axios.get(`${this.$store.state.apiLink}/categories/list-categories`)
      .then(data => { if(data.data.successes) { this.listCategories = data.data.data } })
      .catch(err => console.log(err))
    },
    
    getCategory(id_categories) {
      for(let i = 0; i < this.listCategories.length; i++){
        if(this.listCategories[i].id_number == id_categories) return this.listCategories[i].name_category
      }
    },

    deleteProduct(id){
      const options = {title: 'Notice.', cancelLabel: 'No'}
      this.$dialogs.confirm('Do yo want remove product ?', options)
      .then(res => {
        if (res.ok === true) {
          axios.post(`${this.$store.state.apiLink}/products/remove-product`,{ "token":localStorage.token || null, "id_number":id })
          .then(data => {
            if (data.data.successes) {
              this.$notify({group: 'productDelete',type: 'success', title: 'Notice',text: "Delete product success"})
              this.fetchData()
            } else { this.$notify({group: 'productDelete',type: 'warn', title: 'Notice',text: data.data.reason }) }
          })
          .catch(err => { this.$notify({group: 'productDelete',type: 'error', title: 'Notice',text: data.data.reason }) })
        }
      })
    },

    functionName(id){ this.$router.push('/admin/products/page/'+id) }
  }
};
</script>
