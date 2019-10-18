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
            <li class="nav-item" @click="filterUser('s')">
                <a role="tab" class="nav-link show" id="tab-0" data-toggle="tab" href="#tab-content-0" aria-selected="false">
                    <span>Sinh viên</span>
                </a>
            </li>
            <li class="nav-item" @click="filterUser('t')">
                <a role="tab" class="nav-link show" id="tab-1" data-toggle="tab" href="#tab-content-1" aria-selected="false">
                    <span>Giảng viên</span>
                </a>
            </li>
            <li class="nav-item" @click="isShowFormAdd()">
                <a role="tab" class="nav-link show active" id="tab-2" data-toggle="tab" href="#tab-content-2" aria-selected="true">
                    <span>Thêm mới</span>
                </a>
            </li>
        </ul>

        <div class="main-card mb-3 card" v-if="isShowForm">
            <notifications group="auth" style="margin-top:62px" />
            <div class="card-body">
                <h5 class="card-title">Thêm mới</h5>
                <div class="position-relative row form-group">
                    <label class="col-sm-3 col-form-label">Mã sinh viên / Giảng viên</label>
                    <div class="col-sm-9">
                        <input id="exampleEmail" placeholder="Nhập mã" class="form-control" v-model="code">
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label class="col-sm-3 col-form-label">Họ tên sinh viên/ Giảng viên</label>
                    <div class="col-sm-9">
                        <input id="examplePassword" placeholder="Họ tên" class="form-control" v-model="fullName">
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label for="exampleSelect" class="col-sm-3 col-form-label">Vai trò</label>
                    <div class="col-sm-9">
                        <select id="exampleSelect" class="form-control" @change="onChang()">
                            <option value="">Vai trò</option>
                            <option value="teacher">Giảng viên</option>
                            <option value="student">Sinh viên</option>
                            <option value="header">Trưởng bộ môn</option>
                        </select>
                </div>
                </div>
                <!-- <div class="position-relative row form-group">
                    <label for="exampleFile" class="col-sm-3 col-form-label">File</label>
                    <div class="col-sm-9"><input name="file" id="exampleFile" type="file" class="form-control-file">
                        <small class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                    </div>
                </div> -->
                <div class="position-relative row form-check" style="padding-right: 1.25rem;">
                    <div style="float: right;">
                        <button class="btn btn-secondary" @click="cancelAdd()">Cancel</button>
                        <button class="btn btn-success" @click="addUser()">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">Danh sách user
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
                                    <th class="text-center">Mã số</th>
                                    <th class="text-center">Họ tên</th>
                                    <!-- <th class="text-center">Status</th> -->
                                    <th class="text-center">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(item, index) in data" :key="index">
                                    <td class="text-center text-muted">#{{index + 1}}</td>
                                    <td class="text-center">{{item.code}}</td>
                                    <td class="text-center">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <!-- <div class="widget-content-left mr-3">
                                                    <div class="widget-content-left">
                                                        <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="">
                                                    </div>
                                                </div> -->
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">{{item.fullName}}</div>
                                                    <div class="widget-subheading opacity-7">Web Developer</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <!-- <td class="text-center">
                                        <div class="badge badge-warning">Pending</div>
                                    </td> -->
                                    <td class="text-center">
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-success btn-sm" @click="showFormUpdateUser(item)">
                                            <i class="pe-7s-pen"></i>
                                        </button>
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-danger btn-sm" @click="showFormDeleteUser(item)">
                                            <i class="pe-7s-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <!-- <div class="d-block text-center card-footer">
                        <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button>
                        <button class="btn-wide btn btn-primary">Lưu</button>
                    </div> -->
                </div>
            </div>
        </div>

        
        <modal name="Modal_FormUpdateUser" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
            <div class="image_logo">
                <div class="card card-small mb-4" style="margin-bottom: 0!important">
                    
                    <div class="main-card card" >
                        <notifications group="auth" style="margin-top:62px" />
                        <div class="card-body">
                            <h5 class="card-title">Update user</h5>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Mã sinh viên / Giảng viên</label>
                                        <input id="exampleEmail" placeholder="Nhập mã" class="form-control" v-model="code">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Họ tên sinh viên/ Giảng viên</label>
                                        <input id="examplePassword" placeholder="Họ tên" class="form-control" v-model="fullName">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Vai trò</label>
                                        <select class="form-control" @change="onChangUpdateUser()" ref="decentralise">
                                            <option v-for="(item,index) in decentralises" :key="index" :value="item.id" :selected="item.id == checkSelected(decentralise, headOfChemistry)">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 10px 0;">
                        <button style="max-width: 50%" class="btn btn-secondary" @click="hidenFormUpdateUser()">Cancel</button>
                        <button style="max-width: 50%" class="btn btn-success" @click="updateUser()">Submit</button>
                    </div>
                </div>
            </div>
        </modal>
        
        <modal class="delete" name="FormDeleteUser" style="margin-top: 60px;" width="400px" height="auto" :scrollable="true">
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
                                    <label>Bạn có muốn xóa: <i><b>{{this.fullName}} ?</b></i></label>
                                </div>
                            <div class="button-delete-user" style="text-align: center;">
                                <button class="btn btn-accent btn-primary" @click="hidenFormDeleteUser()">Cancel</button>
                                <button class="btn btn-accent btn-danger" @click="deleteUser(idNumberUser)">Delete</button>
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
                code:"",
                fullName:"",
                decentralise:"",
                headOfChemistry:"",

                idNumberUser:0,
				
                isShowForm: false,
                data:[],
                arrFillter: [],

                decentralises:[
                    {id: "s", name: "Sinh viên"},
                    {id: "t", name: "Giảng viên"},
                    {id: "h", name: "Trưởng bộ môn"},
                    {id: "a", name: "Admin"},
                ]
        	}
        },
        created(){
            this.getAllUser()
        },
        computed:{
			
        },
        methods:{

            deleteUser(idNumber) {
                axios.post(`${this.$store.state.apiLink}/user/delete`, { "token": localStorage.token || "", "idNumber": idNumber, })
                .then(res => {
                    if (res.data.successes){
                        this.$notify({ group: 'auth', title: 'Confirm', text: 'User is deleted', type: 'success'});
                        this.emptyForm()
                        setTimeout(() => { this.hidenFormDeleteUser(); }, 1500)
                        this.getAllUser()
                    } else {
                        this.$notify({group: 'auth',title: 'Notice', text: res.data.reason || "Error",type: 'warn'})
                    }
                })
                .catch(err => console.log(err));
            },

            showFormDeleteUser(user){
                this.fullName = user.fullName
                this.idNumberUser = user.idNumber
                this.$modal.show('FormDeleteUser');
            },

            hidenFormDeleteUser() { 
                this.emptyForm()
                this.$modal.hide('FormDeleteUser'); 
            },

            onChangUpdateUser(){
                var valueSelect = event.target.value
                if(valueSelect === "h"){
                    this.decentralise = "t"
                } 
                else if(valueSelect === "t"){ 
                    this.decentralise = "t" 
                }
                else if(valueSelect === "a"){ 
                    this.decentralise = "a" 
                }
                 else {
                    this.decentralise = "s"
                }
                
            },

            checkSelected(decentralise, headOfChemistry){
                if(headOfChemistry == "y"){
                    return "h"
                }
                else{
                    if(decentralise === "t"){
                        return "t"
                    }
                    else if(decentralise === "a"){
                        return "a"
                    } 
                    else {
                        return "s"
                    }
                }
            },

            updateUser(){
                
                if(this.fullName == "") {
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền họ tên user !" || "Error",type: 'warn'})
                } 
                else if(this.code == "") {
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền mã user !" || "Error",type: 'warn'})
                } 
                else if(this.decentralise == "") {
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền vai trò !" || "Error",type: 'warn'})
                } 
                else {
                    if(this.$refs.decentralise.value === "h") this.headOfChemistry = "y"
                    else this.headOfChemistry = "n"

                    axios.post(`${this.$store.state.apiLink}/user/update`, {
                        "idNumber": this.idNumberUser,
                        "code": this.code,
                        "fullName": this.fullName,
                        "decentralise": this.decentralise, 
                        "headOfChemistry": this.headOfChemistry,
                        "token":localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.emptyForm()
                            this.$notify({group: 'auth',title: 'Notice', text: 'Update user success',type: 'success'});
                            setTimeout(() => { this.hidenFormUpdateUser() }, 1500)
                            this.getAllUser()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason || "Error",type: 'warn'})
                        }
                    })
                    .catch(err => err);
                }
                
            },

            hidenFormUpdateUser() { this.$modal.hide('Modal_FormUpdateUser') },

            showFormUpdateUser(user){ 
                this.idNumberUser = user.idNumber
                this.fullName = user.fullName
                this.code = user.code
                this.decentralise = user.decentralise
                this.$modal.show('Modal_FormUpdateUser') 
            },

        	isShowFormAdd(){
                this.isShowForm = !this.isShowForm
            },

            cancelAdd(){
                this.emptyForm()
                this.isShowForm = false
            },

            emptyForm(){
                this.code = ''
                this.fullName = ''
                this.decentralise = ''
                this.headOfChemistry = ''
                this.idNumberUser = 0
            },

            onChang(){
                var valueSelect = event.target.value
                if(valueSelect === "header"){
                    this.headOfChemistry = "y"
                    this.decentralise = "t"
                } 
                else if(valueSelect === "teacher"){ 
                    this.headOfChemistry = "n"
                    this.decentralise = "t" 
                }
                 else {
                    this.headOfChemistry = "n"
                    this.decentralise = "s"
                }
                
            },

            addUser() {
                
                if(this.code == "" || this.fullName == "" || this.decentralise == "" || this.headOfChemistry == ""){
                    this.$notify({group: 'auth',title: 'Notice', text: "Điền đầy đủ thông tin !" || "Error",type: 'warn'})
                } else {
                    axios.post(`${this.$store.state.apiLink}/user/add`, {
                        "code": this.code,
                        "fullName": this.fullName,
                        "decentralise": this.decentralise, 
                        "headOfChemistry": this.headOfChemistry,
                        "token":localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth',title: 'Notice', text: 'Add user success',type: 'success'});
                            this.emptyForm()
                            setTimeout(()=> { this.isShowForm = false }, 1500)
                            this.getAllUser()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason || "Error",type: 'warn'})
                        }
                    })
                    .catch(err => err);
                }
            },

            filterUser(decentralise){ 
                if(!this.arrFillter || this.arrFillter.length == 0) return ""
                else return this.data = this.arrFillter.filter((item) => item.decentralise == decentralise )
            },

            getAllUser() {
                
                axios.post(`${this.$store.state.apiLink}/user/list-user`, {
                    "token":localStorage.token || ""
                })
                .then(res => {
                    if(res.data.successes){
                        this.data = res.data.data
                        this.arrFillter = this.data 
                    } 
                })
                .catch(err => err);
            },
        },
    }
</script>