<template>
    
    <div class="app-sidebar sidebar-shadow">
        <div class="app-header__logo">
            <div class="logo-src"></div>
            <div class="header__pane ml-auto">
                <div>
                    <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="app-header__mobile-menu">
            <div>
                <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
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
        <div class="scrollbar-sidebar ps ps--active-y">
            <div class="app-sidebar__inner">
                <ul class="vertical-nav-menu metismenu">
                    <!-- <li class="app-sidebar__heading">Dashboards</li> -->
                    <li class="app-sidebar__heading"></li>
                    <li @click="goToPage('/', '')">
                        <nuxt-link to="">
                            <i class="metismenu-icon pe-7s-study"></i>
                            Trang chủ
                        </nuxt-link>
                    </li>

                    <!-- Admin -->
                    <template v-if="checkSidebar()">
                        <li class="app-sidebar__heading">Admin</li>
                        <li @click="goToPage('/admin/users', '')">
                            <nuxt-link to="">
                                <i class="metismenu-icon pe-7s-user"></i>
                                User
                                <i class="metismenu-state-icon caret-left"></i>
                            </nuxt-link>
                        </li>
                        <li @click="goToPage('/admin/subjects', '')">
                            <nuxt-link to="">
                                <i class="metismenu-icon pe-7s-bookmarks"></i>
                                Môn học
                                <i class="metismenu-state-icon caret-left"></i>
                            </nuxt-link>
                        </li>
                    </template>
                    
                    <!-- Giảng viên -->
                    <template v-if="userInfo.decentralise != 's'">
                        <li class="app-sidebar__heading">Quản lý môn học</li>
                        <li v-for="(item, index) in dataSubject" :key="index" @click="showSubmenu(index)" :id="`liCollapse${index}`">
                            <nuxt-link :to="''">
                                <i class="metismenu-icon pe-7s-notebook"></i>
                                    {{item.subjectName}}
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </nuxt-link>
                            <ul class="mm-collapse" :id="`collapse${index}`">
                                <li @click="goToPage('/teacher/list-project/', item.subjectCode)">
                                    <nuxt-link to="">
                                        <i class="metismenu-icon"></i>
                                        Danh sách đề tài
                                    </nuxt-link>
                                </li>
                                <li @click="goToPage('/teacher/list-type-project/', item.subjectCode)">
                                    <nuxt-link to="">
                                        <i class="metismenu-icon"></i>
                                        Danh sách loại đề tài
                                    </nuxt-link>
                                </li>
                                <li @click="goToPage('/teacher/registration-results/', item.subjectCode)">
                                    <nuxt-link to="">
                                        <i class="metismenu-icon"></i>
                                        Kết quả đăng ký
                                    </nuxt-link>
                                </li>
                            </ul>
                        </li>
                    </template>

                    <!-- Sinh viên -->
                    <template v-if="userInfo.decentralise == 's'">
                        <li class="app-sidebar__heading">Danh sách môn học</li>
                        <li v-for="(item, i) in dataSubject" :key="i+dataSubject.length+1" @click="showSubmenu(i+dataSubject.length+1)" :id="`liCollapse${i+dataSubject.length+1}`">
                            <nuxt-link to="">
                                <i class="metismenu-icon pe-7s-diamond"></i>
                                    {{item.subjectName}}
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </nuxt-link>
                            <ul class="mm-collapse " :id="`collapse${i+dataSubject.length+1}`">
                                <li @click="goToPage('/student/list-project/', item.subjectCode)">
                                    <nuxt-link to="">
                                        <i class="metismenu-icon"></i>
                                        Danh sách đề tài
                                    </nuxt-link>
                                </li>
                                <li @click="goToPage('/student/registration-results/', item.subjectCode)">
                                    <nuxt-link to="">
                                        <i class="metismenu-icon"></i>
                                        Kết quả đăng ký
                                    </nuxt-link>
                                </li>
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import axios from "axios";
    import Toaster from "v-toaster";
    import VModal from "vue-js-modal";
    import VueCookies from "vue-cookies";
    import "v-toaster/dist/v-toaster.css";
    import Notifications from "vue-notification";
    import VueLoading from "vuejs-loading-plugin";
    import passwordValidator from "password-validator";
    import mixinsResponsive from "~/functions/responsiveGlobal";
    import i18n from "~/lang/i18n.js";

    import _ from "lodash";

    Vue.use(VueLoading);
    Vue.use(VModal);
    Vue.use(VueCookies);
    Vue.use(Notifications);
    var md5 = require("md5");
    Vue.use(Toaster, { timeout: 10000 });
    export default {
        i18n,
        data() {
            return {
                dataSubject:[],
                userInfo: ""
            };
        },

        created() {
            this.checkSidebar()
        },

        computed: {},

        mounted() {
            this.getAllSubject()
            this.$forceUpdate()
        },

        methods: {

            goToPage(link, param){
                this.$nuxt.$emit("closeSidebarMobile", true)
                this.$router.push({path: `${link}${param}`})
            },

            checkSidebar() {
                if(this.$store.state.userInfo && this.$store.state.userInfo != ""){
                    if(this.$store.state.userInfo.data && this.$store.state.userInfo.data != ""){
                        this.userInfo = this.$store.state.userInfo.data
                        if(this.userInfo.decentralise == "a") return true
                    } else return false
                } else return false 
            },

            getAllSubject() {
                axios.get(`${this.$store.state.apiLink}/subject/list-subjects`)
                .then(res => {
                    if(res.data.successes){
                        this.dataSubject = res.data.data
                    } 
                })
                .catch(err => err);
            },

            showSubmenu(id){
                $("#collapse"+id).toggleClass("mm-show")
                $("#liCollapse"+id).toggleClass("mm-active")
            }
        }
    };
</script>
