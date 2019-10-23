<template>
    <div>
        <notifications group="auth" style="margin-top:62px" />
        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <li class="nav-item" v-for="(item, index) in listType" :key="index" >
                <a role="tab" class="nav-link show" id="tab-0" data-toggle="tab" href="#tab-content-0" aria-selected="false" @click="filterProject(item.idNumber)">
                    <span>{{item.projectTypeName}}</span>
                </a>
            </li>
            
            <li class="nav-item" @click="showFormAdd()">
                <a role="tab" class="nav-link show active" id="tab-2" data-toggle="tab" href="#tab-content-2" aria-selected="true">
                    <span>Thêm đề tài</span>
                </a>
            </li> 
        </ul>
        <div class="main-card mb-3 card" v-if="isShowFormAdd">
            <div class="card-body">
                <h5 class="card-title">Thêm đề tài mới</h5>
                
                <div class="position-relative row form-group">
                    <label for="examplePassword" class="col-sm-2 col-form-label">Tên đề tài</label>
                    <div class="col-sm-10">
                        <input name="text" placeholder="..."  class="form-control" v-model="projectName">
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label for="exampleSelect" class="col-sm-2 col-form-label">Loại đề tài</label>
                    <div class="col-sm-10">
                        <select class="form-control" @change="onChang()">
                            <option :value="idNumberProjectType">Loại đề tài</option>  
                            <option v-for="item in listType" 
                                :key="item.idNumber" 
                                :value="item.idNumber" 
                                :data-foo="item.projectTypeName"
                                :selected="idNumberProjectType"
                            >
                                {{item.projectTypeName}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label for="exampleText" class="col-sm-2 col-form-label">Mục tiêu đề tài</label>
                    <div class="col-sm-10">
                        <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectTarget" v-model="projectTarget"/>
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label for="exampleText" class="col-sm-2 col-form-label">Yêu cầu kiến thức</label>
                    <div class="col-sm-10">
                        <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectRequire" v-model="projectRequire"/>
                    </div>
                </div>
                <div class="position-relative row form-check">
                    <div class="col-sm-2 offset-sm-10">
                        <button class="btn btn-secondary" @click="cancelAdd()">Cancel</button>
                        <button class="btn btn-success" @click="addProject()">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">Danh sách đề tài của môn</div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                                <tr>
                                    <th class="text-center">Mã đề tài</th>
                                    <th>Tên đề</th>
                                    <th class="text-center">Loại đề tài</th>
                                    <th class="text-center">Trạng thái</th>
                                    <th class="text-center">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in listProject" :key="index">
                                    <td class="text-center text-muted">{{item.projectCode}}</td>
                                    <td>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">{{item.projectName | truncate(50)}}</div>
                                                    <div class="widget-subheading opacity-7">GV {{item.teacherName}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">{{item.projectTypeName}}</td>
                                    <td class="text-center">
                                        <div v-if="item.isRatify == 'N'" class="badge badge-warning">{{checkState(item)}}</div>
                                        <div v-else class="badge badge-info">{{checkState(item)}}</div>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm" @click="showFormDetailProject(item)"><i class="pe-7s-look"></i></button>
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-success btn-sm" @click="showFormUpdateProject(item)"><i class="pe-7s-pen"></i></button>
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-danger btn-sm" @click="ShowFormDelete(item)"><i class="pe-7s-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <!-- <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button>
                        <button class="btn-wide btn btn-success">Save</button> -->
                    </div>
                </div>
            </div>
        </div>
        
        <modal name="FormDetailProject" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="height: 85%">
                    <div class="modal-content" style="height: 100%;">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết đề</h5>
                            <button class="close" @click="closeFormDetailProject()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body" style="overflow-y: scroll;">
                            <div>
                                <b>Loại đề tài: </b> <span>{{project.projectTypeName}}</span>
                            </div>
                            <div>
                                <b>Tên đề tài: </b> <p style="text-align: center;"><b>{{project.projectName ? project.projectName.toUpperCase() : ""}}</b></p>
                            </div>
                            <div>
                                <b>Giảng viên: </b> <span><i>{{project.teacherName}}</i></span>
                            </div>
                            <div>
                                <b>Mục tiêu đề tài: </b>
                                <div v-html="project.projectTarget"></div>
                            </div>
                            <div>
                                <b>Yêu cầu kiến thức: </b>
                                <div v-html="project.projectRequire"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeFormDetailProject()">Close</button>
                            <button type="button" class="btn btn-primary" v-if="checkRatify()" @click="ratifyProject(project.idNumber)">Ratify</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="FormUpdateProject" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="height: 85%;">
                    <div class="modal-content" style="height: 100%;">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết</h5>
                            <button class="close" @click="closeFormUpdateProject()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body" style="overflow-y: scroll;">
                            <div class="position-relative row form-group">
                                <label class="col-sm-2 col-form-label">Tên đề tài</label>
                                <div class="col-sm-10">
                                    <input name="text" placeholder="..."  class="form-control" v-model="projectName">
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label class="col-sm-2 col-form-label">Loại đề tài</label>
                                <div class="col-sm-10">
                                    <select class="form-control" @change="onChang()">
                                        <option v-for="(item, index) in listType" 
                                            :key="index" 
                                            :value="item.idNumber" 
                                            :data-foo="item.projectTypeName"
                                            :selected="item.idNumber == idNumberProjectType"
                                        >
                                            {{item.projectTypeName}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label for="exampleText" class="col-sm-2 col-form-label">Mục tiêu đề tài</label>
                                <div class="col-sm-10">
                                    <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectTarget" v-model="projectTarget"/>
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label for="exampleText" class="col-sm-2 col-form-label">Yêu cầu kiến thức</label>
                                <div class="col-sm-10">
                                    <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectRequire" v-model="projectRequire"/>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeFormUpdateProject()">Close</button>
                            <button type="button" class="btn btn-primary" @click="updateProject()">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </modal>

        <modal name="FormDeleteProject" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Xác nhận</h5>
                            <button class="close" @click="cancelDelete()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body">
                            <label>Bạn có muốn xóa: <i><b>{{project.projectName}} ?</b></i></label>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" @click="cancelDelete()">Cancel</button>
                            <button class="btn btn-danger" @click="deleteProject(project.idNumber)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
    import Vue from "vue"
	import axios from "axios"
	import Notifications from 'vue-notification'
	import Toaster from 'v-toaster'
    import 'v-toaster/dist/v-toaster.css'
    import 'tui-editor/dist/tui-editor.css';
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'codemirror/lib/codemirror.css';
    import Editor from '@toast-ui/vue-editor/src/editor.vue'
    
    import VModal from 'vue-js-modal';
    Vue.use(VModal);    
    
    import VueTruncate from'vue-truncate-filter'
    Vue.use(VueTruncate)

	Vue.use(Toaster, {timeout: 10000})
	Vue.use(Notifications)
    var md5 = require('md5');
    
    export default {
        components: { 'editor': Editor },
        data(){
        	return{
                isShowFormAdd: false,
                listType:[],
                listProject:[],
                arrFillter:[],

                idNumber: 0,
                idNumberProjectType: 0, 
                projectTypeName: "", 
                projectName: "", 
                teacherCode: "", 
                projectTarget: "", 
                projectRequire: "",

                editorText: "",
                editorHtml: "",

                project:""
        	}
        },

        created() {
            this.getAllProjectType()
            this.getAllProject()
            this.checkUserPermission()
        },

        methods:{
            checkUserPermission(){
                if(this.$store.state.userInfo && this.$store.state.userInfo != ""){
                    if(this.$store.state.userInfo.data && this.$store.state.userInfo.data != ""){
                        if(this.$store.state.userInfo.data.decentralise == "s") return this.$router.back()
                    } else return false
                } else return false
            },

            deleteProject(idNumber){
                axios.post(`${this.$store.state.apiLink}/project/remove-project`, {
                    "idNumber": idNumber,
                    "token": localStorage.token || ""
                })
                .then(res => {
                    if(res.data.successes){
                        this.$notify({group: 'auth', title: 'Notice', text: 'Delete project success',type: 'success'});
                        this.cancelDelete()
                        this.getAllProjectType()
                        this.getAllProject()
                    } else {
                        this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                    }
                })
            },

            ShowFormDelete(item){
                this.project = item
                this.$modal.show('FormDeleteProject')
            },

            cancelDelete(){
                this.project = ""
                this.$modal.hide('FormDeleteProject')
            },

            ratifyProject(idNumber){
                axios.post(`${this.$store.state.apiLink}/project/ratify-project`, {
                    "idNumber": idNumber,
                    "token": localStorage.token || ""
                })
                .then(res => {
                    if(res.data.successes){
                        this.$notify({group: 'auth', title: 'Notice', text: 'Ratify project success',type: 'success'});
                        this.closeFormDetailProject()
                        this.getAllProjectType()
                        this.getAllProject()
                    } else {
                        this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                    }
                })
            },

            checkRatify(){
                if(this.project.isRatify == "Y") return false
                else {
                    if(this.$store.state.userInfo.data.headOfChemistry == "y" || this.$store.state.userInfo.data.decentralise == "a") return true
                    else return false
                }
            },

            updateProject(){
                
                this.projectTarget = this.$refs.projectTarget.invoke('getHtml')
                this.projectRequire = this.$refs.projectRequire.invoke('getHtml')

                if(this.idNumber == 0 || this.idNumberProjectType == 0 || this.projectTypeName == "" || this.projectName == "" || this.projectTarget == "" || this.projectRequire == ""){
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền đầy đủ thông tin !",type: 'warn'})
                } else {
                    axios.post(`${this.$store.state.apiLink}/project/update-project`, {
                        "idNumber": this.idNumber,
                        "idNumberProjectType": this.idNumberProjectType, 
                        "projectTypeName": this.projectTypeName, 
                        "projectName": this.projectName, 
                        "projectTarget": this.projectTarget, 
                        "projectRequire": this.projectRequire,
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Update project success',type: 'success'});
                            this.closeFormUpdateProject()
                            this.getAllProjectType()
                            this.getAllProject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
            },

            closeFormUpdateProject(){
                this.emptyForm()
                this.$modal.hide('FormUpdateProject')
            },

            showFormUpdateProject(item){
                this.idNumber = item.idNumber
                this.idNumberProjectType = item.idNumberProjectType
                this.projectTypeName = item.projectTypeName
                this.projectName = item.projectName
                this.projectTarget = item.projectTarget
                this.projectRequire = item.projectRequire
                this.$modal.show('FormUpdateProject')
            },
            
            closeFormDetailProject(){
                this.project = ""
                this.$modal.hide('FormDetailProject')
            },

            showFormDetailProject(item){
                this.project = item
                this.$modal.show('FormDetailProject')
            },

            filterProject(idNumber){ 
                if(!this.arrFillter || this.arrFillter.length == 0) return ""
                else return this.listProject = this.arrFillter.filter(item => item.idNumberProjectType == idNumber )
            },

            checkState(item){
                if(item.isRatify == "N") return "Đang chờ"
                else return "Đã duyệt"
            },
            cancelAdd(){
                this.isShowFormAdd = false
                this.emptyForm()
            },
            addProject() {
                this.projectTarget = this.$refs.projectTarget.invoke('getHtml')
                this.projectRequire = this.$refs.projectRequire.invoke('getHtml')
                
                if(this.projectTypeName == "" || this.projectName == "" || this.projectTarget == "" || this.projectRequire == ""){
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền đầy đủ thông tin !",type: 'warn'})
                } else {
                    axios.post(`${this.$store.state.apiLink}/project/add-project`, {
                        idNumberProjectType: this.idNumberProjectType, 
                        projectTypeName: this.projectTypeName, 
                        projectName: this.projectName, 
                        teacherCode: this.$store.state.userInfo.data.code, 
                        projectTarget: this.projectTarget, 
                        projectRequire: this.projectRequire,

                        "subjectCode": this.$route.params.id,
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Add project success',type: 'success'});
                            this.isShowFormAdd = false
                            this.emptyForm()
                            this.getAllProjectType()
                            this.getAllProject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
            },
            
            onChang(){
                this.idNumberProjectType = Number(event.target.value)
                this.projectTypeName = event.target.options[event.target.options.selectedIndex].dataset.foo
            },

            emptyForm(){
                this.idNumber = 0
                this.idNumberProjectType = 0
                this.projectTypeName = "" 
                this.projectName = ""
                this.teacherCode = ""
                this.projectTarget = "" 
                this.projectRequire = ""
            },
            
            showFormAdd(){
                this.isShowFormAdd = !this.isShowFormAdd
            },

            getAllProjectType() {
                
                axios.post(`${this.$store.state.apiLink}/projectstype/list-projectstype-by-subjectcode`,{
                    "subjectCode": this.$route.params.id,
                })
                .then(res => {
                    if(res.data.successes){
                        this.listType = res.data.data
                    } 
                })
                .catch(err => err);
            },

            getAllProject() {
                
                axios.post(`${this.$store.state.apiLink}/project/list-project-by-subjectcode`,{
                    "subjectCode": this.$route.params.id,
                    "token": localStorage.token || ""
                })
                .then(res => {
                    if(res.data.successes){
                        this.listProject = res.data.data
                        this.arrFillter = res.data.data
                    } 
                })
                .catch(err => err);
            },
        }
    }
</script>