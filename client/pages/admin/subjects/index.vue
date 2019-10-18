<template >
    <div>
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
                </div>    
            </div>
        </div>

        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <!-- <li class="nav-item" @click="filterUser('s')">
                <a role="tab" class="nav-link show" id="tab-0" data-toggle="tab" href="#tab-content-0" aria-selected="false">
                    <span>Sinh viên</span>
                </a>
            </li>
            <li class="nav-item" @click="filterUser('t')">
                <a role="tab" class="nav-link show" id="tab-1" data-toggle="tab" href="#tab-content-1" aria-selected="false">
                    <span>Giảng viên</span>
                </a>
            </li> -->
            <li class="nav-item" @click="ShowFormAdd()">
                <a role="tab" class="nav-link show active" id="tab-2" data-toggle="tab" href="#tab-content-2" aria-selected="true">
                    <span>Thêm môn học mới</span>
                </a>
            </li>
        </ul>


        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">Danh sách môn học hiện tại ở khoa
                        <div class="btn-actions-pane-right">
                            <div role="group" class="btn-group-sm btn-group">
                                <button class="active btn btn-focus">Last Week</button>
                                <button class="btn btn-focus">All Month</button>
                            </div>
                        </div>
                    </div>
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
                                                    <div class="widget-subheading opacity-7">Web Developer</div>
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

        <modal name="FormAddSubject" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
            <div class="image_logo">
                <div class="card card-small mb-4" style="margin-bottom: 0!important">
                    <div class="main-card card" >
                        <notifications group="auth" style="margin-top:62px" />
                        <div class="card-body">
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
                    </div>
                    <div style="text-align: center; padding: 10px 0;">
                        <button style="max-width: 50%" class="btn btn-secondary" @click="cancelAdd()">Cancel</button>
                        <button style="max-width: 50%" class="btn btn-success" @click="addSubject()">Submit</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="FormUpdateSubject" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
            <div class="image_logo">
                <div class="card card-small mb-4" style="margin-bottom: 0!important">
                    <div class="main-card card" >
                        <notifications group="auth" style="margin-top:62px" />
                        <div class="card-body">
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
                    </div>
                    <div style="text-align: center; padding: 10px 0;">
                        <button style="max-width: 50%" class="btn btn-secondary" @click="hidenFormUpdateSubject()">Cancel</button>
                        <button style="max-width: 50%" class="btn btn-success" @click="updateSubject()">Submit</button>
                    </div>
                </div>
            </div>
        </modal>
        
        <modal class="delete" name="FormdeleteSubject" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
            <notifications group="auth" style="margin-top:62px" />
            <div class="card card-small form-delete-user">
                <div class="card-header border-bottom">
                    <h6 class="m-0">Xác nhận</h6>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item p-3">
                        <div class="row">
                            <div class="col">
                                <div class="form-row">
                                    <label>Bạn có muốn xóa: <i><b>{{subjectName}} ?</b></i></label>
                                </div>
                            <div class="button-delete-user" style="text-align: center;">
                                <button class="btn btn-accent btn-primary" @click="hidenFormdeleteSubject()">Cancel</button>
                                <button class="btn btn-accent btn-danger" @click="deleteSubject(idNumberSubject)">Delete</button>
                            </div>
                            </div>
                        </div>
                    </li>
                </ul>
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
                        setTimeout(() => { this.hidenFormdeleteSubject(); }, 500)
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

/////////////////////////////////////////////////////////////////
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
                            setTimeout(() => { this.hidenFormUpdateSubject() }, 1500)
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
///////////////////////////////////////////////////////////

        	ShowFormAdd(){
                this.$modal.show('FormAddSubject')
            },

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
                            setTimeout(()=> { this.$modal.hide('FormAddSubject') }, 1000)
                            this.getAllSubject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason,type: 'warn'})
                        }
                    })
                }
            },

            getAllSubject() {
                
                axios.get(`${this.$store.state.apiLink}/subject/list-subjects`)
                .then(res => {
                    if(res.data.successes){
                        this.data = res.data.data
                    } 
                })
                .catch(err => err);
            },
        },
    }
</script>