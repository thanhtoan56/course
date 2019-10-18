<template>
    <div>
        <notifications group="auth" style="margin-top:62px" />
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-car icon-gradient bg-mean-fruit">
                        </i>
                    </div>
                    <div>Analytics Dashboard
                        <div class="page-title-subheading">This is an example dashboard created using build-in elements and components.
                        </div>
                    </div>
                </div>
                <div class="page-title-actions">
                    <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" class="btn-shadow mr-3 btn btn-dark">
                        <i class="fa fa-star"></i>
                    </button>
                    <div class="d-inline-block dropdown">
                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-shadow dropdown-toggle btn btn-info">
                            <span class="btn-icon-wrapper pr-2 opacity-7">
                                <i class="fa fa-business-time fa-w-20"></i>
                            </span>
                            Buttons
                        </button>
                        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a href="javascript:void(0);" class="nav-link">
                                        <i class="nav-link-icon lnr-inbox"></i>
                                        <span>
                                            Inbox
                                        </span>
                                        <div class="ml-auto badge badge-pill badge-secondary">86</div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="javascript:void(0);" class="nav-link">
                                        <i class="nav-link-icon lnr-book"></i>
                                        <span>
                                            Book
                                        </span>
                                        <div class="ml-auto badge badge-pill badge-danger">5</div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="javascript:void(0);" class="nav-link">
                                        <i class="nav-link-icon lnr-picture"></i>
                                        <span>
                                            Picture
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a disabled href="javascript:void(0);" class="nav-link disabled">
                                        <i class="nav-link-icon lnr-file-empty"></i>
                                        <span>
                                            File Disabled
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>    </div>
        </div>  

        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <li class="nav-item" v-for="(item, index) in listType" :key="index" >
                <a role="tab" class="nav-link show" id="tab-0" data-toggle="tab" href="#tab-content-0" aria-selected="false" @click="filterProject(item.idNumber)">
                    <span>{{item.projectTypeName}}</span>
                </a>
            </li>
        </ul>

        <div class="row">
            <div class="col-sm-12 col-lg-12">
                <div class="card-hover-shadow-2x mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-database icon-gradient bg-malibu-beach"> </i>
                            <span>Danh sách đề</span>
                        </div>
                    </div>
                    <div class="scroll-area-lg">
                        <div class="scrollbar-container ps ps--active-y">
                            <div class="p-2">
                                <ul class="todo-list-wrapper list-group list-group-flush">
                                    <li class="list-group-item" v-for="(item, index) in listProject" :key="index">
                                        <div class="todo-indicator bg-warning"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control" style="padding-left: 0; padding-right: 1.5rem;">
                                                        <input type="checkbox" >
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div><span>{{item.projectTypeName}}</span></div>
                                                    <div>Mã d?: <b>{{item.projectCode}}</b></div>
                                                    <div class="widget-heading"> {{item.projectName | truncate(60)}}</div>
                                                    <div>GV: <i>{{item.teacherName}}</i></div>
                                                </div>
                                                <div class="widget-content-right">
                                                    <div class="ml-2">
                                                        <button type="button" class="btn btn-primary btn-sm" @click="showFormDetailProject(item)"><i class="pe-7s-look"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="list-group-item" v-for="(item, index) in listProject" :key="index">
                                        <div class="todo-indicator bg-warning"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control" style="padding-left: 0; padding-right: 1.5rem;">
                                                        <input type="checkbox" >
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div><span>{{item.projectTypeName}}</span></div>
                                                    <div>Mã đề: <b>{{item.projectCode}}</b></div>
                                                    <div class="widget-heading"> {{item.projectName | truncate(60)}}</div>
                                                    <div>GV: <i>{{item.teacherName}}</i></div>
                                                </div>
                                                <div class="widget-content-right">
                                                    <div class="ml-2">
                                                        <button type="button" class="btn btn-primary btn-sm" @click="showFormDetailProject(item)"><i class="pe-7s-look"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
                            <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                        </div>
                        <div class="ps__rail-y" style="top: 0px; height: 400px; right: 0px;">
                            <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 232px;"></div>
                        </div>
                    </div>
                    </div>
                    <div class="d-block text-right card-footer">
                        <button class="btn btn-success" @click="showFormRegistration()">Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>

        <modal name="FormDetailProject" width="auto" height="auto" :scrollable="true">
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
                        </div>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="FormRegistration" width="auto" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="height: 85%;">
                    <div class="modal-content" style="height: 100%;">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết</h5>
                            <button class="close" @click="closeFormRegistration()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body" style="overflow-y: scroll;">
                            <div class="position-relative row form-group">
                                <label class="col-sm-2 col-form-label">MSSV</label>
                                <div class="col-sm-10">
                                    <input name="text" class="form-control" v-model="memberCode">
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label class="col-sm-2 col-form-label">Họ tên</label>
                                <div class="col-sm-10">
                                    <input name="text" class="form-control" v-model="memberName">
                                </div>
                                <div class="col-sm-12" style="margin-top: 1rem;">
                                    <button type="button" class="btn btn-primary" @click="addMember()" >Thêm thành viên</button>
                                </div>
                            </div>

                            <div class="position-relative row form-group">
                                <div class="table-responsive">
                                    <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">MSSV</th>
                                                <th>Họ tên</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in teams" :key="index">
                                                <td class="text-center text-muted">{{item.memberCode}}</td>
                                                <td>{{item.memberName}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeFormRegistration()">Close</button>
                            <button type="button" class="btn btn-primary" @click="updateProject()">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </modal>

        <modal name="FormDeleteProject" width="auto" height="auto" :scrollable="true">
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

                project:"",


                //////////////////////////
                teams:[],
                memberCode: "", 
                memberName: "",
        	}
        },

        created() {
            this.getAllProjectType()
            this.getAllProject()
        },

        methods:{
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
                            this.closeFormRegistration()
                            this.getAllProjectType()
                            this.getAllProject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
            },

            addMember(){
                console.log(this.memberCode) 
                console.log(this.memberName)
                var item = {}
                item.memberCode = this.memberCode
                item.memberName = this.memberName
                this.teams.push(item)
                console.log(this.teams)
                this.memberCode = ""
                this.memberName = ""
            },

            closeFormRegistration(){
                this.emptyForm()
                this.teams = []
                this.$modal.hide('FormRegistration')
            },

            // showFormRegistration(item){
            showFormRegistration(){
                // var item = {}
                // item.memberCode = this.$store.state.userInfo.data.code
                // item.memberName = this.$store.state.userInfo.data.fullName
                // this.teams.push(item)
                this.memberCode = this.$store.state.userInfo.data.code
                this.memberName = this.$store.state.userInfo.data.fullName
                this.$modal.show('FormRegistration')
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
<style>
    .list-group-item{
        padding: 0.75rem 1.25rem !important;
    }
</style>