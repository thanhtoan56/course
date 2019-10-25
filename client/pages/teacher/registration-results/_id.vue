<template>
    <div>
        <notifications group="auth" style="margin-top:62px" />
        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <li class="nav-item" v-for="(item, index) in listType" :key="index" >
                <a role="tab" class="nav-link show" id="tab-0" data-toggle="tab" href="#tab-content-0" aria-selected="false" @click="filterProject(item.idNumber)">
                    <span>{{item.projectTypeName}}</span>
                </a>
            </li>
        </ul>

        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">Kết quả đăng ký</div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                                <tr>
                                    <th class="text-center">Mã đề tài</th>
                                    <th>Tên đề</th>
                                    <th class="text-center">Loại đề tài</th>
                                    <th class="text-center">Trạng thái</th>
                                    <th class="text-center">Chi tiết</th>
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
                                        <div v-if="item.state == 0" class="badge badge-warning">{{checkState(item)}}</div>
                                        <div v-else-if="item.state == 1" class="badge badge-info">{{checkState(item)}}</div>
                                        <div v-else class="badge badge-danger">{{checkState(item)}}</div>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm" @click="showFormDetailProject(item)"><i class="pe-7s-look"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <!-- <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> -->
                        <button class="btn-wide btn btn-success" @click="showFormPrint()">In kết quả</button>
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
                            <div>
                                <b>Danh sách sinh viên của nhóm: </b>
                            </div>
                            <div class="table-responsive">
                                <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th class="text-center">STT</th>
                                            <th class="text-center">MSSV</th>
                                            <th>Họ tên</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in project.members" :key="index">
                                            <td class="text-center text-muted">{{index + 1}}</td>
                                            <td class="text-center text-muted">{{item.memberCode}}</td>
                                            <td>{{item.memberName}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeFormDetailProject()">Close</button>
                            <button type="button" class="btn btn-danger" @click="cancelProject(project)">Cancel</button>
                            <button type="button" class="btn btn-primary"  @click="confirmProject(project)">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="FormPrintResult" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="width: 300px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết</h5>
                            <button class="close" @click="hideFormPrint()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body">
                            <div class="position-relative row form-group">
                                <label class="col-sm-3 col-form-label">Loại</label>
                                <div class="col-sm-9">
                                    <select class="form-control" @change="onChang()">
                                        <option :value="0" selected>Chọn loại đề tài</option>
                                        <option v-for="(item, index) in listType" 
                                            :key="index" 
                                            :value="item.idNumber" 
                                            :data-foo="item.projectTypeName"
                                        >
                                            {{item.projectTypeName}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="hideFormPrint()">Hủy</button>
                            <button type="button" class="btn btn-primary" @click="exportDownload()">Export và download</button>
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
    import VModal from 'vue-js-modal';
    import VueTruncate from'vue-truncate-filter'

    Vue.use(VModal);
    Vue.use(VueTruncate)
	Vue.use(Toaster, {timeout: 10000})
	Vue.use(Notifications)
    
    export default {
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

            hideFormPrint(){
                this.emptyForm()
                this.$modal.hide("FormPrintResult")
            },

            showFormPrint(){
                this.$modal.show("FormPrintResult")
            },

            onChang(){
                this.idNumberProjectType = Number(event.target.value)
                this.projectTypeName = event.target.options[event.target.options.selectedIndex].dataset.foo
            },
            
            exportDownload(){
                if(this.idNumberProjectType == 0) return this.$notify({group: 'auth', title: 'Notice', text: 'Vui lòng chọn loại đề tài',type: 'warn'});
                else {
                axios.post(`${this.$store.state.apiLink}/registration/export-download`, {
                        "subjectCode": this.$route.params.id,
                        "idNumberProjectType": this.idNumberProjectType, 
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        var link = res.data.data
                        // console.log(link)
                        axios({
                            url: `${this.$store.state.apiApp}${link}`,
                            method: 'GET',
                            responseType: 'blob',
                        }).then(response => {
                            var nameFile = response.config.url.split("/")[response.config.url.split("/").length - 1]
                            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                            var fileLink = document.createElement('a');
                            fileLink.href = fileURL;
                            fileLink.setAttribute('download', nameFile);
                            document.body.appendChild(fileLink);
                            fileLink.click();

                            this.hideFormPrint()
                            this.emptyForm()
                            this.getAllProjectType()
                            this.getAllProject()
                        });
                    })
                }
            },

            cancelProject(project){
                if(project.state > 0) return this.$notify({group: 'auth', title: 'Notice', text: 'You have either confirmed or canceled',type: 'warn'});
                else {
                    axios.post(`${this.$store.state.apiLink}/registration/cancel-registration`, {
                        "idNumberProjectType": project.idNumberProjectType, 
                        "leaderCode": project.leaderCode,
                        "idNumber": project.idNumber,
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Cancel success',type: 'success'});
                            this.closeFormDetailProject()
                            this.getAllProjectType()
                            this.getAllProject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
            },

            confirmProject(project){
                if(project.state > 0) return this.$notify({group: 'auth', title: 'Notice', text: 'You have either confirmed or canceled',type: 'warn'});
                else {
                    axios.post(`${this.$store.state.apiLink}/registration/confirm-registration`, {
                        "idNumberProjectType": project.idNumberProjectType, 
                        "leaderCode": project.leaderCode,
                        "idNumber": project.idNumber,
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Confirm success',type: 'success'});
                            this.closeFormDetailProject()
                            this.getAllProjectType()
                            this.getAllProject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
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
                if(item.state == 0) return "Đang chờ"
                if(item.state == 1) return "Đã duyệt"
                else return "Đã hủy"
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
                
                axios.post(`${this.$store.state.apiLink}/registration/list-registration-teacher`,{
                    "subjectCode": this.$route.params.id,
                    "token": localStorage.token || null
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