<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Product Update</h3>
      </div>
    </div>
    <div class="row">
      <notifications group="products" />
      <div class="col-lg-12">
        <div class="card card-small mb-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
              <div class="row">
                <div class="col">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="feFirstName">Name Product</label>
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" v-model="name_product" ref="name_product"/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Link</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" v-model="linkAccent" readonly />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Category ID</label>
                        <select name="cateID" id="cateID" ref="cateID" style="width: 100%;height: 38px;border: 1px solid #ccc;border-radius: 4px">
                            <option value="0">Please select Categories</option>  
                            <option v-for="category in categories" v-bind:key="category.id_number" :value="category.id_number" :selected="category.id_number == id_categories">{{category.name_category}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="feEmailAddress">Sku</label>
                            <input type="username" class="form-control" id="" placeholder="" v-model="sku" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="feEmailAddress">Total Quantity</label>
                            <input type="text" class="form-control" id="" placeholder="" v-model="total_quantity" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="fePassword">Price Origin</label>
                            <input type="text" class="form-control" id="" placeholder="" v-numericOnly v-model="price_origin"/>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="feInputAddress">Price Promotion</label>
                            <input type="text" class="form-control" id="feInputAddress" placeholder="" v-numericOnly v-model="price_promotion"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="feInputCity">Made</label>
                            <input type="text" class="form-control" id="feInputCity" v-model="made">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="fePassword">Brand</label>
                            <input type="text" class="form-control" id="" placeholder="" v-model="brand"/>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="feInputAddress">Image Main</label>
                          <div class="img-update-product" v-if="!removeImg">
                            <div class="file-show-image" v-if="image_main">
                              <img v-bind:src="$store.state.apiApp + 'products/' + image_main" alt="" style="max-width: 150px;">
                              <button type="button" class="btn btn-danger" @click="removeImage(id_number)">Remove Image</button>
                            </div>
                            <div class="file-show-no-image" v-else>
                              <input type="file" name="file" id="fileMain" class="form-control" placeholder="" style="height: auto" />
                            </div>
                          </div>
                          <div class="img-update-productno" v-else>
                              <input type="file" name="file" id="fileMain" class="form-control" placeholder="" style="height: auto" />
                          </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" @click="showInfoUpdate" style="margin: 10px 0;">Click Infomation Update</button>
                    <div class="infomation-update" v-if="infoUpdate">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="feInputCity">Sex</label>
                                <input type="text" class="form-control" id="feInputCity" v-model="sex">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="feEmailAddress">Type</label>
                                <input type="username" class="form-control" id="" placeholder="" value="" v-model="type">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="feInputAddress">Color</label>
                                <input type="text" class="form-control" id="feInputAddress" placeholder="" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="feInputAddress">Add Info</label>
                                <input type="text" class="form-control" id="feInputAddress" placeholder="" />   
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="feDescription">Tags</label>
                            <textarea class="form-control" name="feTags" rows="3" v-model="tags"></textarea>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="feDescription">Description</label>
                            <textarea class="form-control" name="feDescription" rows="3" v-model="description"></textarea>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="feDescription">Specifications</label>
                            <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="speciText" v-model="specifications"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="feDescription">Detail</label>
                            <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="tuiEditor" v-model="detail"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="feDescription">Show Index</label>
                            <input type="checkbox" name="showIndex" :checked="showIndex" v-model="showIndex">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="feDescription">Free Ship</label>
                            <input type="checkbox" name="freeShip" :checked="freeShip" v-model="freeShip">
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" @click="cancelUpdate">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">Update Product</button>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import Editor from '@toast-ui/vue-editor/src/editor.vue'
import Notifications from 'vue-notification';
import mixinDecentralize from '~/functions/decentralize'
    
Vue.use(Notifications);
Vue.directive('numericOnly', {
	bind(el, binding, vnode) {
	    el.addEventListener('keydown', (e) => {
            // console.log(e.preventDefault())
	        if ([8, 9, 27, 13].indexOf(e.keyCode) !== -1 || // BACKSPACE = 8, TAB = 9, ESC = 27, LEFT_ENTER = 13
	            (e.keyCode === 65 && e.ctrlKey === true) || //ctr + A
	            (e.keyCode === 67 && e.ctrlKey === true) || //ctr + C
	            (e.keyCode === 88 && e.ctrlKey === true) ||
	            (e.keyCode === 46 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39) || 
                e.keyCode == 231) {
	            return
	        }
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault()
	        }
	        // if (el.value.length >= 7) {
	        // 	e.preventDefault()
	        // }			        	        
	    })
	}	
})
export default {
  layout:"admin",
  components: { 'editor': Editor },
  mixins: [mixinDecentralize],
  data(){
    return {
      linkCategories: "",
      arrDetail: [],
      categories: "",
      infoUpdate: false,
      editorText: "",
      editorHtml: "",
      name_product: "",
      add_info: "",
      brand: "",
      capacity: "",
      description: "",
      detail: "",
      type: "",
      id_categories: 0,
      id_number: 0,
      image_main: "",
      price_promotion: "",
      tags: "",
      link: "",
      made: "",
      material: "",
      price_origin: "",
      sex: "",
      size: "",
      sku: "",
      removeImg: false,
      showIndex: 0,
      freeShip: 0,
      total_quantity: "",
      specifications: "",

      errors: []
    }
  },
  
  created(){
    this.linkCategories = this.$route.params.id
    this.fetchProduct()
    this.fetchCategories()
  },
  computed:{
      linkAccent(){ return this.cleanAccents(this.name_product) },
  },
  methods:{
    fetchProduct() {
      axios.get(`${this.$store.state.apiLink}/products/${this.linkCategories}`)
      .then(data => {
        if (data.data.successes) {
          this.arrDetail = data.data.data
          this.name_product  = data.data.data[0].name_product
          this.add_info  = data.data.data[0].add_info
          this.brand  = data.data.data[0].brand
          this.capacity  = data.data.data[0].capacity
          this.description  = data.data.data[0].description
          this.tags  = data.data.data[0].tags
          this.detail  = data.data.data[0].detail
          this.id_categories  = data.data.data[0].id_categories
          this.id_number  = data.data.data[0].id_number
          this.image_main  = data.data.data[0].image_main
          this.link  = data.data.data[0].link
          this.made  = data.data.data[0].made
          this.material  = data.data.data[0].material
          this.price_origin  = data.data.data[0].price_origin
          this.price_promotion  = data.data.data[0].price_promotion
          this.sex  = data.data.data[0].sex
          this.showIndex  = data.data.data[0].showIndex
          this.freeShip  = data.data.data[0].freeShip
          this.size  = data.data.data[0].size
          this.sku  = data.data.data[0].sku
          this.total_quantity = data.data.data[0].total_quantity
          this.specifications = data.data.data[0].specifications
        }
      })
      .catch(err => { console.log(err) })
    },

    showInfoUpdate(){ this.infoUpdate = !this.infoUpdate },

    cleanAccents(str){
      if (str && str !== "") {
        str= str.toLowerCase();
        str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a")
        str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e")
        str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i")
        str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
        str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
        str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
        str= str.replace(/đ/g,"d")
        str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-")
        str= str.replace(/-+-/g,"-");
        str= str.replace(/^\-+|\-+$/g,"")
      }
      return str
    },

    fetchCategories(){
      axios.get(`${this.$store.state.apiLink}/categories/list-categories`)
      .then(res => this.categories = res.data.data)
      .catch(err => console.log(err));
    },

    updateProduct(){
      if (this.name_product !== "" && this.brand !== "" && this.link !== "" && this.made !== "" && this.price_origin !== "") {
        
        this.checkFormatPrice(this.price_origin);
        if(this.price_promotion ) { this.checkFormatPrice(this.price_promotion) }
        
        if(this.errors.length > 0) { 
            for(let i = 0; i < this.errors.length; i ++){
                this.$notify({ group: "products", title: "Notice", text: this.errors[i], type: "error" });
            }
            this.errors = []
            return
        }
        var formData = new FormData();
        var imagefile = document.querySelector('#fileMain');
        
        if (imagefile && imagefile !== "" && imagefile !== undefined && imagefile !== null) { formData.append("image_main", imagefile.files[0]); }
        else { formData.append("image_main", ""); }
        
        formData.append("name_product",this.name_product)
        formData.append("link",this.cleanAccents(this.name_product))
        formData.append("id_number",this.id_number)
        formData.append("sku",this.sku)
        formData.append("price_origin",this.price_origin)
        formData.append("price_promotion",this.price_promotion)
        formData.append("made",this.made)
        formData.append("brand",this.brand)
        formData.append("showIndex",this.showIndex)
        formData.append("freeShip",this.freeShip)
        formData.append("tags",this.tags)
        formData.append("description",this.description)
        formData.append("id_categories",this.$refs.cateID.value)
        formData.append("detail",this.$refs.tuiEditor.invoke('getHtml'))
        formData.append("sex",this.sex)
        formData.append("size",this.size)
        formData.append("material",this.material)
        formData.append("total_quantity",this.total_quantity)
        formData.append("specifications",this.$refs.speciText.invoke('getHtml'));
        formData.append("token",localStorage.token || null)
        
        axios.post(`${this.$store.state.apiLink}/products/update-product`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(data => {
          if (data.data.successes){
            this.$notify({group: 'products',type: 'success', title: 'Notice',text: "Update Successfully"}) 
            setTimeout(() => { this.$router.back()}, 1000)
          } else { this.$notify({group: 'products',type: 'error', title: 'Notice',text: data.data.reason || "Update no success"}) }
        })
        .catch(err => { console.log(err) })
      } else { this.$notify({group: 'products',type: 'warning', title: 'Notice',text: "Please enter infomation"}) }
    },

    checkFormatPrice(itemTest){
        const item = _.toString(itemTest);
        if (item.indexOf(' ') > 0) { this.errors.push(item + " must not have spaces !")}
        else if (item.indexOf('.') > 0) { this.errors.push(item +" must not have dot !") }
        else if (item.indexOf(',') > 0) { this.errors.push(item +" must not have comma !") }
        else if ( ! Number.isInteger(Number(item))) { this.errors.push(item +" must be number !") }
    },

    cancelUpdate(){ this.$router.back() },

    removeImage(id){
      axios.post(`${this.$store.state.apiLink}/products/remove-image`,{"token":localStorage.token || null , "id_number":id})
      .then( data => {
        if (data.data.successes) {
          this.$notify({group: 'products',type: 'success', title: 'Notice',text: "Remove Image successfully !"})
          this.removeImg = !this.removeImg
        } else { this.$notify({group: 'products',type: 'error', title: 'Notice',text: data.data.reason || "Remove image no success"}) }
      })
      .catch(err => { console.log(err) })
    }
  },
}
</script>