<template>
  <div  class="main-content-container container-fluid px-4" >
    <notifications group="contents" />
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Content Update</h3>
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
                        <label for="feFirstName">Name Content</label>
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" v-model="name_content" ref="name_content"/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Link</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" v-model="linkAccent" readonly />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Category ID</label>
                        <select name="cateID" id="cateID" ref="cateID" style="width: 100%;height: 38px;border: 1px solid #ccc;border-radius: 4px">
                            <option value="0">Please select Categories</option>  
                            <option v-for="category in categories" v-bind:key="category.id" :value="category.id" :selected="category.id == cate">{{category.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                          <label for="feInputAddress">Image Main</label>
                          <div class="img-update-content" v-if="!removeImg">
                            <div class="file-show-image" v-if="image_content">
                              <img v-bind:src="$store.state.apiApp + 'contents/' + image_content" alt="" style="max-width: 150px;">
                              <button type="button" class="btn btn-danger" @click="removeImage(id_number)">Remove Image</button>
                            </div>
                            <div class="file-show-no-image" v-else>
                              <input type="file" name="file" id="fileMain" class="form-control" placeholder="" style="height: auto" />
                            </div>
                          </div>
                          <div class="img-update-contentno" v-else>
                              <input type="file" name="file" id="fileMain" class="form-control" placeholder="" style="height: auto" />
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
                            <textarea class="form-control" name="feDescription" rows="3" v-model="des_content"></textarea>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="feDescription">Detail</label>
                            <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="tuiEditor" v-model="detail_content"/>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" @click="cancelUpdate">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="updateContent">Update Content</button>
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
import 'codemirror/lib/codemirror.css';
import Notifications from 'vue-notification';
import Editor from '@toast-ui/vue-editor/src/editor.vue'
import mixinDecentralize from '~/functions/decentralize'

Vue.use(Notifications);

export default {
  layout:"admin",
  components: { 'editor': Editor },
  mixins: [mixinDecentralize],
  data() {
    return {
      linkCategories:"",
      arrDetail:[],
      categories:[
          {"id":1,"name":"Header"},
          {"id":2,"name":"Footer"}
      ],
      infoUpdate:false,
      editorText:"",
      editorHtml:"",
      name_content:"",
      des_content:"",
      id_number:0,
      image_content:"",
      tags:"",
      link:"",
      cate:0,
      detail_content:'',
      removeImg:false
    }
  },
  
  created(){
    this.linkCategories = this.$route.params.id
    
    this.fetchContent()
  },
  computed:{
      linkAccent(){ return this.cleanAccents(this.name_content) },
  },
  methods:{
    fetchContent() {
      axios.get(`${this.$store.state.apiLink}/contents/${this.linkCategories}`).then(data=>{
        if (data.data.successes) {
          this.arrDetail = data.data.data
          this.name_content  = data.data.data.name_content
          this.des_content  = data.data.data.des_content
          this.tags  = data.data.data.tags
          this.detail_content  = data.data.data.detail_content
          this.cate  = data.data.data.cate
          this.id_number  = data.data.data.id_number
          this.image_content  = data.data.data.image_content
          this.link  = data.data.data.link
        }
      })
      .catch(err => { console.log(err) })
    },

    showInfoUpdate(){ this.infoUpdate = !this.infoUpdate },
    
    cleanAccents(str){
      if (str && str !== "") {
        str= str.toLowerCase()
        str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a")
        str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e")
        str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i")
        str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
        str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
        str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
        str= str.replace(/đ/g,"d")
        str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-")
        str= str.replace(/-+-/g,"-")
        str= str.replace(/^\-+|\-+$/g,"")
      }
      return str
    },

    cancelUpdate(){ this.$router.back(); },

    updateContent(){
      if (this.name_content !== "" && this.brand !== "" && this.link !== "" && this.made !== "" && this.price_origin !== "") {
        var formData = new FormData();
        var imagefile = document.querySelector('#fileMain');
        
        if (imagefile && imagefile !== "" && imagefile !== undefined && imagefile !== null) { formData.append("image_content", imagefile.files[0]); }
        else { formData.append("image_content", ""); }

        formData.append("name_content",this.name_content)
        formData.append("link",this.cleanAccents(this.name_content))
        formData.append("id_number",this.id_number)
        formData.append("tags",this.tags)
        formData.append("des_content",this.des_content)
        formData.append("cate",this.$refs.cateID.value)
        formData.append("detail_content",this.$refs.tuiEditor.invoke('getHtml'))
        formData.append("token",localStorage.token || null)
        
        axios.post(`${this.$store.state.apiLink}/contents/update-content`,formData, { headers: { 'Content-Type': 'multipart/form-data'}})
        .then(data =>{
          if (data.data.successes) {
            this.$notify({group: 'contents',type: 'success', title: 'Notice',text: "Update Successfully"})
            this.$router.back()
            this.$nuxt.$emit("showUpdate",true)
          } else { this.$notify({group: 'contents',type: 'error', title: 'Notice',text: data.data.reason || "Update no success"}) }
        })
        .catch(err =>{ console.log(err) })
      } else { this.$notify({group: 'contents',type: 'warning', title: 'Notice',text: "Please enter infomation"}) }
    },
    
    removeImage(id){
      axios.post(`${this.$store.state.apiLink}/contents/remove-image`,{"token":localStorage.token || null , "id_number":id})
      .then(data => {
        if (data.data.successes) {
          this.$notify({group: 'contents',type: 'success', title: 'Notice',text: "Remove Image successfully !"})
          this.removeImg = !this.removeImg
        } else { this.$notify({group: 'contents',type: 'error', title: 'Notice',text: data.data.reason || "Remove image no success"}) }
      })
      .catch(err => { console.log(err) })
    }
  },
}
</script>