<template>
    <div>
        <notifications group="auth" style="margin-top:62px" />
        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <li class="nav-item" @click="ShowFormAdd()">
                <a role="tab" class="nav-link show active" id="tab-2" data-toggle="tab" href="#tab-content-2" aria-selected="true">
                    <span>Thêm mới</span>
                </a>
            </li>
        </ul>
        
        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">Danh sách loại đề tài của môn</div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Mã môn</th>
                                <th class="text-center">Tên môn</th>
                                <th class="text-center">Loại đề tài</th>
                                <th class="text-center">Chỉnh sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data" :key="index">
                                    <td class="text-center">#{{item.idNumber}}</td>
                                    <td class="text-center">{{item.subjectCode}}</td>
                                    <td class="text-center">{{item.subjectName}}</td>
                                    <td class="text-center">
                                        <div class="badge badge-warning">{{item.projectTypeName}}</div>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-success btn-sm" @click="ShowFormUpdate(item)"><i class="pe-7s-pen"></i></button>
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
        
        <modal name="FormAddProjectType" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="max-width: 400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="card-title">Thêm loại đề tài</h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Tên loại đề tài</label>
                                        <input id="examplePassword" placeholder="..." class="form-control" v-model="projectTypeName">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button style="max-width: 50%" class="btn btn-secondary" @click="cancelAdd()">Cancel</button>
                            <button style="max-width: 50%" class="btn btn-success" @click="addProjectType()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="FormUpdateProjectType" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="max-width: 400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="m-0">Update loại đề tài</h6>
                        </div>
                        <div class="modal-body">
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Tên loại đề tài</label>
                                        <input id="examplePassword" placeholder="..." class="form-control" v-model="projectTypeName">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button style="max-width: 50%" class="btn btn-secondary" @click="cancelUpdate()">Cancel</button>
                            <button style="max-width: 50%" class="btn btn-success" @click="updateProjectType()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="FormDeleteProjectType" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="max-width: 400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="m-0">Xác nhận</h6>
                        </div>
                        <div class="modal-body">
                            <div class="form-row">
                                <label>Bạn có muốn xóa: <i><b>{{projectTypeName}} ?</b></i></label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-accent btn-primary" @click="cancelDelete()">Cancel</button>
                            <button class="btn btn-accent btn-danger" @click="deleteProjectType(idNumber)">Delete</button>
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
    
    Vue.use(VModal);
	Vue.use(Toaster, {timeout: 10000})
	Vue.use(Notifications)
    
    export default {
        data(){
        	return{
                data:[],

                projectTypeName:"", 
                idNumber: 0
        	}
        },
        created() {
            this.getAllProjectType()
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

            deleteProjectType(idNumber) {
                axios.post(`${this.$store.state.apiLink}/projectstype/remove-projectstype`, {
                    "idNumber": idNumber,
                    "token": localStorage.token || ""
                })
                .then(res => {
                    if(res.data.successes){
                        this.$notify({group: 'auth', title: 'Notice', text: 'Delete success',type: 'success'});
                        this.$modal.hide('FormDeleteProjectType')
                        this.getAllProjectType()
                    } else {
                        this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                    }
                })
            },

            ShowFormDelete(item){
                this.projectTypeName = item.projectTypeName
                this.idNumber = item.idNumber
                this.$modal.show('FormDeleteProjectType')
            },

            cancelDelete(){
                this.emptyForm()
                this.$modal.hide('FormDeleteProjectType')
            },

            updateProjectType() {
                if(this.projectTypeName == "" ){
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền đầy đủ thông tin !",type: 'warn'})
                } 
                else {
                    axios.post(`${this.$store.state.apiLink}/projectstype/update-projectstype`, {
                        "projectTypeName": this.projectTypeName,
                        "idNumber": this.idNumber,
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Update success',type: 'success'});
                            this.$modal.hide('FormUpdateProjectType')
                            this.getAllProjectType()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
            },

            ShowFormUpdate(item){
                this.projectTypeName = item.projectTypeName
                this.idNumber = item.idNumber
                this.$modal.show('FormUpdateProjectType')
            },

            cancelUpdate(){
                this.emptyForm()
                this.$modal.hide('FormUpdateProjectType')
            },

            ShowFormAdd(){
                this.$modal.show('FormAddProjectType')
            },

            cancelAdd(){
                this.emptyForm()
                this.$modal.hide('FormAddProjectType')
            },

            emptyForm(){
                this.projectTypeName = ''
            },

            addProjectType() {
                
                if(this.projectTypeName == "" ){
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền đầy đủ thông tin !",type: 'warn'})
                } 
                else {
                    axios.post(`${this.$store.state.apiLink}/projectstype/add-projectstype`, {
                        "projectTypeName": this.projectTypeName,
                        "subjectCode": this.$route.params.id,
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Add projectstype success',type: 'success'});
                            this.$modal.hide('FormAddProjectType')
                            this.getAllProjectType()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
            },
            
            getAllProjectType() {
                axios.get(`${this.$store.state.apiLink}/projectstype/list-projectstype`)
                .then(res => {
                    if(res.data.successes){ this.data = res.data.data } 
                })
                .catch(err => err);
            },
        }
    }
</script>