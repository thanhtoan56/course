<template>
    <div>
        <notifications group="auth" style="margin-top:62px" />
        <div class="app-header header-shadow">
            <div class="app-header__logo">
                <!-- <div class="logo-src"> -->
                <!-- <div>
                    <img src="/assets/images/logo-tdt-120_0.png" alt="" style="max-width: 60%">
                </div> -->
                <img src="/assets/images/logo-tdt-120_0.png" alt="" style="max-width: 40%">
                <div class="header__pane ml-auto">
                    <div id="btnShowSideBar">
                        <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <template v-if="isShowButtonSideBar">
                                <span class="hamburger-box" @click="hideSidebar()">
                                    <span class="hamburger-inner"></span>
                                </span>
                            </template>
                            <template v-else>
                                <span class="hamburger-box" @click="showSidebar()">
                                    <span class="hamburger-inner"></span>
                                </span>
                            </template>
                        </button>
                    </div>
                </div>
            </div>
            <div class="app-header__mobile-menu">
                <div id="btnShowSideBarMobile">
                    <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav" >
                        <template v-if="isShowButtonSideBarMobile">
                            <span class="hamburger-box" @click="showSidebarMobile()">
                                <span class="hamburger-inner"></span>
                            </span>
                        </template>
                        <template v-else>
                            <span class="hamburger-box" @click="hideSidebarMobile()">
                                <span class="hamburger-inner"></span>
                            </span>
                        </template>
                    </button>
                </div>
            </div>
            <div class="app-header__menu">
                <span>
                    <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span class="btn-icon-wrapper">
                            <i class="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div class="app-header__content">
                <div class="app-header-left">
                    <div class="search-wrapper">
                        <div class="input-holder">
                            <input type="text" class="search-input" placeholder="Type to search">
                            
                            <button v-if="isShowInputSearch" class="search-icon" @click="showInputSearch()"><span></span></button>
                            <button v-else class="search-icon" @click="search()" id="dsdsdsds"><span></span></button>
                        </div>
                        <button class="close" @click="hideInputSearch()"></button>
                    </div>
                    <ul class="header-menu nav">
                        <li class="nav-item">
                            <a target="_blank" href="https://tdtu.edu.vn" class="nav-link">ĐẠI HỌC TÔN ĐỨC THẮNG</a> 
                        </li>
                        <li class="nav-item">
                            <a target="_blank" href="https://it.tdtu.edu.vn" class="nav-link">Trang chủ khoa Công Nghệ Thông Tin</a> 
                        </li>
                        <li class="nav-item">
                            <a target="_blank" href="https://stdportal.tdtu.edu.vn" class="nav-link">Hệ thống Thông tin sinh viên</a> 
                        </li>
                    </ul>
                </div>
                <div class="app-header-right">
                    <div class="header-btn-lg pr-0">
                        <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="btn-group">
                                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
                                            <!-- <img width="42" class="rounded-circle" src="/assets/images/avatars/1.jpg" alt=""> -->
                                            <img width="42" class="rounded-circle" src="/assets/images/avatars/user.jpg" alt="">
                                            <i class="fa fa-angle-down ml-2 opacity-8"></i>
                                        </a>
                                        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                                            <!-- <button type="button" tabindex="0" class="dropdown-item">User Account</button>
                                            <button type="button" tabindex="0" class="dropdown-item">Settings</button>
                                            <h6 tabindex="-1" class="dropdown-header">Header</h6>
                                            <button type="button" tabindex="0" class="dropdown-item">Actions</button>
                                            <div tabindex="-1" class="dropdown-divider"></div> -->
                                            <button type="button" tabindex="0" class="dropdown-item" @click="showFormChangPassword()">Change password</button>
                                            <div tabindex="-1" class="dropdown-divider"></div>
                                            <button type="button" tabindex="0" class="dropdown-item" @click="userLogout()">Logout</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left  ml-3 header-user-info">
                                    <div class="widget-heading">{{userInfo ? userInfo.fullName : ""}}</div>
                                    <div class="widget-subheading">{{userInfo ? userInfo.code: ""}}</div>
                                </div>
                                <!-- <div class="widget-content-right header-user-info ml-3">
                                    <button type="button" class="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                                        <i class="fa text-white fa-calendar pr-1 pl-1"></i>
                                    </button>
                                </div> -->
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
        
        <modal name="FormChangPassword" style="margin-top: 60px;" width="400" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg" style="max-width: 400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">User</h5>
                            <button class="close" @click="hideFormChangPassword()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body">
                            <h5 class="card-title">Change password</h5>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Password old</label>
                                        <input type="password" class="form-control" v-model="passwordOld">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Password new</label>
                                        <input type="password" class="form-control" v-model="passwordNew">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="position-relative form-group">
                                        <label class="col-form-label">Password confirm</label>
                                        <input type="password" class="form-control" v-model="confirmPasswordNew">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button style="max-width: 50%" class="btn btn-secondary" @click="hideFormChangPassword()">Cancel</button>
                            <button style="max-width: 50%" class="btn btn-success" @click="changePassword()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import Vue from "vue";
    import axios from "axios";
    import Toaster from 'v-toaster';
    import VModal from "vue-js-modal";
    import VueCookies from "vue-cookies";
    import 'v-toaster/dist/v-toaster.css';
    import Notifications from 'vue-notification';
    import VueLoading from 'vuejs-loading-plugin';
    import passwordValidator from 'password-validator';
    import mixinsResponsive from '~/functions/responsiveGlobal';
    import i18n from '~/lang/i18n.js';

    import _ from 'lodash';

    Vue.use(VueLoading);
    Vue.use(VModal);
    Vue.use(VueCookies);
    Vue.use(Notifications);
    var md5 = require('md5');
    Vue.use(Toaster, {timeout: 10000});
    export default {
        i18n,
        data() {
            return {
                isShowButtonSideBar: true,
                isShowButtonSideBarMobile: true,
                isShowInputSearch: true,
                userInfo: "",

                passwordOld: "",
                passwordNew: "",
                confirmPasswordNew: ""
            };
        },
        
        created() { 
            this.check()
        },

        computed: {},
        
        mounted(){ 
            this.$nuxt.$on("closeSidebarMobile", data => {
                this.hideSidebarMobile()
            })
        },
        
        watch: { },
        
        methods: {

            check() {
                if(this.$store.state.userInfo && this.$store.state.userInfo != ""){
                    if(this.$store.state.userInfo.data && this.$store.state.userInfo.data != ""){
                        this.userInfo = this.$store.state.userInfo.data
                        return this.$store.state.userInfo.data
                    } else return this.$router.replace({path:'/login'}) 
                } else return this.$router.replace({path:'/login'}) 
            },

            userLogout(){ 
                this.$store.dispatch('clearAutUser',true);  
                this.$router.push({path:'/login'})
            },

            search(){

            },
            hideFormChangPassword(){
                this.$modal.hide('FormChangPassword')
            },
            showFormChangPassword(){
                this.$modal.show('FormChangPassword')
            },
            changePassword(){
                var passwordOld         = md5(this.passwordOld)
                var passwordNew         = md5(this.passwordNew)
                var confirmPasswordNew  = md5(this.confirmPasswordNew)

                if(this.passwordOld == "" || this.passwordNew == "" || this.confirmPasswordNew == "") {
                    return this.$notify({ group: 'auth', title: 'Confirm', text: 'Điền đầy đủ thông tin !', type: 'warn'});
                } 
                else if( passwordNew != confirmPasswordNew ) {
                    return this.$notify({ group: 'auth', title: 'Confirm', text: 'Password new và Password conform không khớp', type: 'warn'});
                } else {
                    axios.post(`${this.$store.state.apiLink}/user/change-password`, {
                        "passWordOld": passwordOld, 
                        "passWordNew": passwordNew,
                        "token":localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Thay đổi thành công',type: 'success'});
                            setTimeout(() => {
                                this.emptyForm()
                                this.hideFormChangPassword()
                                this.userLogout()
                            }, 2000);
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason,type: 'warn'})
                        }
                    })
                }
            },

            emptyForm(){
                this.passwordOld = ""
                this.passwordNew = ""
                this.confirmPasswordNew = ""
            },

            //  Mobile  //
            hideSidebarMobile(){
                this.isShowButtonSideBarMobile = !this.isShowButtonSideBarMobile
                this.$nuxt.$emit("hideSidebarMobile", true)
                $("#btnShowSideBarMobile"+ " button").removeClass('is-active')
            },
            showSidebarMobile(){
                this.isShowButtonSideBarMobile = !this.isShowButtonSideBarMobile
                this.$nuxt.$emit("showSidebarMobile", true)
                $("#btnShowSideBarMobile"+ " button").addClass('is-active')
            },
            //////////////

            showInputSearch(){
                this.isShowInputSearch = !this.isShowInputSearch
                $(".app-header-left"+ " div").addClass('active')
            },
            hideInputSearch(){
                this.isShowInputSearch = !this.isShowInputSearch
                $(".app-header-left"+ " div").removeClass('active')
            },

            hideSidebar(){
                this.isShowButtonSideBar = !this.isShowButtonSideBar
                this.$nuxt.$emit("hideSidebar", true)
                $("#btnShowSideBar"+ " button").addClass('is-active')
            },
            showSidebar(){
                this.isShowButtonSideBar = !this.isShowButtonSideBar
                this.$nuxt.$emit("showSidebar", true)
                $("#btnShowSideBar"+ " button").removeClass('is-active')
            },
        }
    };
</script>

