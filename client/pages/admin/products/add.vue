<template>
  <div class="main-content-container container-fluid px-4">
    <notifications group="products" />
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Product Add</h3>
      </div>
    </div>
    <div class="row">
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
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" v-model="name_product"/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Link</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" v-model="linkAccent" readonly />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Category ID</label>
                        <select name="cateID" id="cateID" ref="cateID" style="width: 100%;height: 38px;border: 1px solid #ccc;border-radius: 4px">
                            <option value="0">Please select Categories</option>  
                            <option v-for="category in categories" v-bind:key="category.id_number" :value="category.id_number">{{category.name_category}}</option>
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
                            <input type="text" class="form-control" id="" placeholder="" v-numericOnly v-model="price_origin"  />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="feInputAddress">Price Promotion</label>
                            <input type="text" class="form-control" id="feInputAddress" placeholder="" v-numericOnly v-model="price_promotion" />
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
                            <input type="file" name="file" id="fileMain" class="form-control" placeholder="" style="height: auto" />
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
                            <editor :html="editorHtmlDetail" mode="wysiwyg" :value="editorTextDetail" ref="tuiEditor" v-model="detail"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="feDescription">Show Index</label>
                            <input type="checkbox" name="showIndex" v-model="showIndex">
                            <label for="feDescription" style="padding-left: 10px;">Free Ship</label>
                            <input type="checkbox" name="freeShip" v-model="freeShip">
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" @click="cancelAdd">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="addProduct">Add Product</button>
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
import Vue from "vue";
import axios from "axios";
import Notifications from 'vue-notification';
import VModal from 'vue-js-modal';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import Editor from '@toast-ui/vue-editor/src/editor.vue'
import mixinDecentralize from '~/functions/decentralize'
Vue.use(VModal);
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
    data() {
        return {
            editorText: '',
            editorTextDetail:'',
            editorHtml: "",
            editorHtmlDetail: "",
            categories: [],
            infoUpdate: false,
            name_product: "",
            link: "",
            sku: "",
            total_quantity: "",
            price_origin: 0,
            price_promotion: 0,
            made: "",
            brand: "",
            tags: "",
            description: "",
            sex: "",
            type: "",
            showIndex: 0,
            freeShip: 0,
            specifications: "", 
            detail: "",

            errors: []
        }
    },
    created(){
        this.fetchCategories()
    },
    computed:{
        linkAccent(){ return this.cleanAccents(this.name_product) },
    },
    methods:{
        
        fetchCategories(){
            axios.get(`${this.$store.state.apiLink}/categories/list-categories`)
            .then(res => this.categories = res.data.data)
            .catch(err => console.log(err));
        },
        
        showInfoUpdate(){ this.infoUpdate = !this.infoUpdate},
        
        addProduct(){
            const name_product = this.name_product
            const link = this.linkAccent
            const sku = this.sku
            const total_quantity = this.total_quantity
            const price_origin = this.price_origin
            const price_promotion = this.price_promotion > 0 ? this.price_promotion : 0
            const made = this.made
            const brand = this.brand
            const tags = this.tags
            const description = this.description
            const id_categories  = this.$refs.cateID.value
            
            const specification = this.$refs.speciText.invoke('getHtml')
            const detail =  this.$refs.tuiEditor.invoke('getHtml')

            
            if (name_product == "") { this.errors.push("Name product empty"); }

            if (link == "") { this.errors.push("Link product empty"); }
            
            if (id_categories == "0") { this.errors.push("Categories empty"); }
            
            if (sku == "") { this.errors.push("Sku product empty"); }

            if (total_quantity == "") { this.errors.push("Total quantity product empty"); }

            if (price_origin == 0) { this.errors.push("Price Origin product empty"); }

            if (price_promotion != 0) {
                if (price_promotion > price_origin) { this.errors.push("Promotion must be less than origin"); }
            }
            
            if (made == "") { this.errors.push("Made product empty"); }

            if (brand == "") { this.errors.push("Brand product empty"); }
            
            if (tags == "") {this.errors.push("Tags product empty"); }

            if (description == "") { this.errors.push("Description product empty"); }

            if (specification == "") { this.errors.push("Specification product empty"); }

            if (detail == "") { this.errors.push("Detail product empty"); }

            if(price_origin) {this.checkFormatPrice(price_origin);}
            
            if(price_promotion && price_promotion > 0) { this.checkFormatPrice(price_promotion) }
            
            if(this.errors.length > 0) { 
                for(let i = 0; i < this.errors.length; i ++){
                    this.$notify({ group: "products", title: "Notice", text: this.errors[i], type: "warn" });
                }
                this.errors = []
                return
            }

            var formData = new FormData();
            var imagefile = document.querySelector('#fileMain');
            
            if (imagefile.files.length == 0) { return this.$notify({ group: "products", title: "Notice", text: "Image product empty", type: "warn" }); } 
            else {
                formData.append("image_main", imagefile.files[0]);
                formData.append("name_product",name_product)
                formData.append("link",link)
                formData.append("sku",sku)
                formData.append("total_quantity",total_quantity)
                formData.append("specifications",specification)
                formData.append("price_origin",price_origin)
                formData.append("price_promotion", price_promotion)
                formData.append("made",made)
                formData.append("showIndex",this.showIndex)
                formData.append("freeShip",this.freeShip)
                formData.append("brand",brand)
                formData.append("tags",tags)
                formData.append("description",description)
                formData.append("id_categories",id_categories)
                formData.append("detail",detail)
                formData.append("token",localStorage.token || null)

                axios.post(`${this.$store.state.apiLink}/products/add-product`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then( data => {
                    if (data.data.successes){
                        this.$notify({group: 'products', title: 'Notice',text: "Add product successes !",type: 'success'})
                        setTimeout(() => { this.$router.back()}, 1000)
                    } else { this.$notify({group: 'products', title: 'Notice', text: data.data.reason, type: 'warn'}) }
                })
                .catch(err => { this.$notify({group: 'products', title: 'Notice', text: err, type: 'error'}) })
            }
        },
        cancelAdd(){ this.$router.back() },
        
        checkFormatPrice(item){
            if (item.indexOf(' ') > 0) { this.errors.push(item + " must not have spaces !")}
            else if (item.indexOf('.') > 0) { this.errors.push(item +" must not have dot !") }
            else if (item.indexOf(',') > 0) { this.errors.push(item +" must not have comma !") }
            else if ( ! Number.isInteger(Number(item))) { this.errors.push(item +" must be number !") }
        },

        cleanAccents(str){
            if (str && str !== "") {
                str= str.toLowerCase();
                str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
                str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
                str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
                str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
                str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
                str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
                str= str.replace(/đ/g,"d");
                str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
                str= str.replace(/-+-/g,"-"); 
                str= str.replace(/^\-+|\-+$/g,"");
            }
            return str
        },
    }
}
</script>
