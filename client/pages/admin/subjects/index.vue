<template >
    <div>
        <notifications group="auth" style="margin-top:62px" />

        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <li class="nav-item" @click="ShowFormAdd()">
                <a role="tab" class="nav-link show active" id="tab-2" data-toggle="tab" href="#tab-content-2" aria-selected="true">
                    <span>Thêm môn học mới</span>
                </a>
            </li>
        </ul>

        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">Danh sách môn học hiện tại ở khoa</div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                                <tr>
                                    <th class="text-center">STT</th>
                                    <th class="text-center">Mã môn</th>
                                    <th class="text-center">Tên môn</th>
                                    <th class="text-center">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data" :key="index">
                                    <td class="text-center text-muted">#{{index + 1}}</td>
                                    <td class="text-center">{{item.subjectCode}}</td>
                                    <td class="text-center">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <!-- <div class="widget-content-left mr-3">
                                                    <div class="widget-content-left">
                                                        <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="">
                                                    </div>
                                                </div> -->
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">{{item.subjectName}}</div>
                                                    <!-- <div class="widget-subheading opacity-7">Web Developer</div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-success btn-sm" @click="showFormUpdateSubject(item)">
                                            <i class="pe-7s-pen"></i>
                                        </button>
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-danger btn-sm" @click="showFormdeleteSubject(item)">
                                            <i class="pe-7s-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <!-- <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button>
                        <button class="btn-wide btn btn-primary"></button> -->
                    </div>
                </div>
            </div>
        </div>

        <modal name="FormAddSubject" style="margin-top: 60px;" width="400" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="max-width: 400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết môn</h5>
                            <button class="close" @click="cancelAdd()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body">
                            <h5 class="card-title">Thêm môn học mới</h5>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Mã môn học</label>
                                        <input id="exampleEmail" placeholder="Nhập mã" class="form-control" v-model="subjectCode">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Tên môn học</label>
                                        <input id="examplePassword" placeholder="Họ tên" class="form-control" v-model="subjectName">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button style="max-width: 50%" class="btn btn-secondary" @click="cancelAdd()">Cancel</button>
                            <button style="max-width: 50%" class="btn btn-success" @click="addSubject()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="FormUpdateSubject" style="margin-top: 60px;" width="400" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="max-width: 400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết môn</h5>
                            <button class="close" @click="hidenFormUpdateSubject()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body">
                            <h5 class="card-title">Update môn học</h5>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Mã môn học</label>
                                        <input id="exampleEmail" placeholder="Nhập mã" class="form-control" v-model="subjectCode">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Tên môn học</label>
                                        <input id="examplePassword" placeholder="Họ tên" class="form-control" v-model="subjectName">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button style="max-width: 50%" class="btn btn-secondary" @click="hidenFormUpdateSubject()">Cancel</button>
                            <button style="max-width: 50%" class="btn btn-success" @click="updateSubject()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
        
        <modal class="delete" name="FormdeleteSubject" style="margin-top: 60px;" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="max-width: 400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="m-0">Xác nhận</h6>
                        </div>
                        <div class="modal-body">
                            <div class="form-row">
                                <label>Bạn có muốn xóa: <i><b>{{subjectName}} ?</b></i></label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-accent btn-primary" @click="hidenFormdeleteSubject()">Cancel</button>
                            <button class="btn btn-accent btn-danger" @click="deleteSubject(idNumberSubject)">Delete</button>
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
    var md5 = require('md5');
    
    export default {
        data(){
        	return{
                data:[],
                arrFillter: [],

                subjectName:"", 
                subjectCode:"",
                idNumberSubject:0,
        	}
        },
        created(){
            this.getAllSubject()
        },
        computed:{
			
        },
        methods:{
            
            deleteSubject(idNumber) {
                axios.post(`${this.$store.state.apiLink}/subject/remove-subject`, { "token": localStorage.token || "", "idNumber": idNumber, })
                .then(res => {
                    if (res.data.successes){
                        this.$notify({ group: 'auth', title: 'Confirm', text: 'Subject is deleted', type: 'success'});
                        this.emptyForm()
                        this.hidenFormdeleteSubject()
                        this.getAllSubject()
                    } else {
                        this.$notify({group: 'auth',title: 'Notice', text: res.data.reason || "Error",type: 'warn'})
                    }
                })
                .catch(err => console.log(err));
            },

            showFormdeleteSubject(subject){
                this.subjectName = subject.subjectName
                this.idNumberSubject = subject.idNumber
                this.$modal.show('FormdeleteSubject');
            },

            hidenFormdeleteSubject() { 
                this.emptyForm()
                this.$modal.hide('FormdeleteSubject'); 
            },

            updateSubject(){
                
                if(this.subjectCode == "") {
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền mã môn học !",type: 'warn'})
                } 
                else if(this.subjectName == "") {
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền tên môn học !",type: 'warn'})
                } 
                else {
                    axios.post(`${this.$store.state.apiLink}/subject/update-subject`, {
                        "idNumber": this.idNumberSubject,
                        "subjectCode": this.subjectCode,
                        "subjectName": this.subjectName,
                        "token":localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.emptyForm()
                            this.$notify({group: 'auth',title: 'Notice', text: 'Update subject success',type: 'success'});
                            this.hidenFormUpdateSubject()
                            this.getAllSubject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason || "Error",type: 'warn'})
                        }
                    })
                    .catch(err => err);
                }
            },

            hidenFormUpdateSubject() { this.$modal.hide('FormUpdateSubject') },

            showFormUpdateSubject(user){ 
                this.idNumberSubject = user.idNumber
                this.subjectCode = user.subjectCode
                this.subjectName = user.subjectName
                this.$modal.show('FormUpdateSubject') 
            },

        	ShowFormAdd(){ this.$modal.show('FormAddSubject') },

            cancelAdd(){
                this.emptyForm()
                this.$modal.hide('FormAddSubject')
            },

            emptyForm(){
                this.subjectCode = ''
                this.subjectName = ''
                this.idNumberSubject = 0
            },

            addSubject() {
                if(this.subjectCode == "" || this.subjectName == ""){
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền đầy đủ thông tin !" || "Error",type: 'warn'})
                } else {
                    axios.post(`${this.$store.state.apiLink}/subject/add-subject`, {
                        "subjectName": this.subjectName, 
                        "subjectCode": this.subjectCode,
                        "token":localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Add subject success',type: 'success'});
                            this.$modal.hide('FormAddSubject') 
                            this.getAllSubject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason,type: 'warn'})
                        }
                    })
                }
            },

            getAllSubject() {
                axios.get(`${this.$store.state.apiLink}/subject/list-subjects`)
                .then(res => { if(res.data.successes){ this.data = res.data.data }  })
                .catch(err => err);
            },
        },
    }
</script>