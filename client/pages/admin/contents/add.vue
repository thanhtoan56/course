<template>
  <div class="main-content-container container-fluid px-4">
    <notifications group="banners" />
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Content Add</h3>
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
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" v-model="name_content"/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Link</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" v-model="linkAccent" readonly />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="feLastName">Category ID</label>
                        <select name="cateID" id="cateID" ref="cateID" style="width: 100%;height: 38px;border: 1px solid #ccc;border-radius: 4px">
                            <option value="0">Please select Categories</option>  
                            <option v-for="category in categories" v-bind:key="category.id" :value="category.id">{{category.name}}</option>{{categories}}
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="feInputAddress">Image Main</label>
                            <input type="file" name="file" id="fileMain" class="form-control" placeholder="" style="height: auto" />
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
                            <label for="feDescription">Detail</label>
                            <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="tuiEditor"/>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" @click="cancelAdd">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="addContent">Add Content</button>
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
Vue.use(VModal);
Vue.use(Notifications);
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import Editor from '@toast-ui/vue-editor/src/editor.vue'
import mixinDecentralize from '~/functions/decentralize'

export default {
    layout:"admin",
    components: { 'editor': Editor },
    mixins: [mixinDecentralize],
    data() {
        return {
            editorText: '',
            editorHtml: '',
            infoUpdate:false,
            name_content:"",
            link:"",
            tags:"",
            description:"",
            categories:
            [
                {"id":1,"name":"Header"},
                {"id":2,"name":"Footer"},
                {"id":3,"name":"Help"},
            ]
        }
    },
    
    computed:{
        linkAccent(){ return this.cleanAccents(this.name_content) },
    },
    methods:{
        showInfoUpdate(){ this.infoUpdate = !this.infoUpdate },

        cancelAdd(){ this.$router.back() },

        addContent(){
            const name_content = this.name_content
            const link = this.linkAccent
            const tags = this.tags
            const description = this.description
            const cate  = this.$refs.cateID.value
            const detail  = this.editorText
            if (name_content !== "" && link !== "" && tags !== "" && description !== "") {
                var formData = new FormData();
                var imagefile = document.querySelector('#fileMain');
                formData.append("image_content", imagefile.files[0]);
                formData.append("name_content",name_content)
                formData.append("link",link)
                formData.append("tags",tags)
                formData.append("des_content",description)
                formData.append("cate",cate)
                formData.append("detail_content",this.$refs.tuiEditor.invoke('getHtml'))
                formData.append("token",localStorage.token || null)
                
                axios.post(`${this.$store.state.apiLink}/contents/add-content`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then( data => {
                    if (data.data.successes) {
                        this.$notify({group: 'banners',type: 'success', title: 'Notice',text: "Add content successes !"})
                        this.$router.back()
                    } else { this.$notify({group: 'banners',type: 'error', title: 'Notice',text: data.data.reason || "Add content error"}) }
                })
                .catch(err => { console.log(err) })
            } else { this.$notify({group: 'banners',type: 'warning', title: 'Notice',text: "Please enter full infomation"}) }
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
