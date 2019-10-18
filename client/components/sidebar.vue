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
                    <li class="app-sidebar__heading">Dashboards</li>
                    <li>
                        <a href="#" class="mm-active">
                            <i class="metismenu-icon pe-7s-study"></i>
                            Trang chủ
                        </a>
                    </li>
                    <li class="app-sidebar__heading">Admin</li>
                    <li>
                        <nuxt-link to="/admin/users">
                            <i class="metismenu-icon pe-7s-user"></i>
                            User
                            <i class="metismenu-state-icon caret-left"></i>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/admin/subjects">
                            <i class="metismenu-icon pe-7s-bookmarks"></i>
                            Môn học
                            <i class="metismenu-state-icon caret-left"></i>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="#">
                            <i class="metismenu-icon pe-7s-notebook"></i>
                            Đề tài
                        </nuxt-link>
                    </li>
                    
                    
                    <li class="app-sidebar__heading">Giảng viên</li>
                    <li v-for="(item, index) in dataSubject" :key="index">
                        <nuxt-link :to="''">
                            <i class="metismenu-icon pe-7s-diamond"></i>
                                {{item.subjectName}}
                            <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                        </nuxt-link>
                        <ul class="mm-collapse">
                            <li>
                                <nuxt-link :to="`/teacher/list-project/${item.subjectCode}`">
                                    <i class="metismenu-icon"></i>
                                    Danh sách đề tài
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link :to="`/teacher/list-type-project/${item.subjectCode}`">
                                    <i class="metismenu-icon"></i>
                                    Danh sách loại đề tài
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/teacher/registration-results">
                                    <i class="metismenu-icon"></i>
                                    Kết quả đăng ký
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>

                    <li class="app-sidebar__heading">Sinh viên</li>
                    <li v-for="(item, i) in dataSubject" :key="i">
                        <nuxt-link :to="''">
                            <i class="metismenu-icon pe-7s-diamond"></i>
                                {{item.subjectName}}
                            <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                        </nuxt-link>
                        <ul class="mm-collapse">
                            <li>
                                <nuxt-link to="/student/list-project">
                                    <i class="metismenu-icon"></i>
                                    Danh sách đề tài
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/student/registration-results">
                                    <i class="metismenu-icon"></i>
                                    Kết quả đăng ký
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
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
    import HeaderMobile from "~/components/client/headermobile";
    import i18n from "~/lang/i18n.js";

    import _ from "lodash";

    Vue.use(VueLoading);
    Vue.use(VModal);
    Vue.use(VueCookies);
    Vue.use(Notifications);
    var md5 = require("md5");
    Vue.use(Toaster, { timeout: 10000 });
    export default {
        components: { HeaderMobile },
        i18n,
        data() {
            return {
                dataSubject:[]
            };
        },

        created() {
            // this.getAllSubject()
        },

        computed: {},

        mounted() {
            this.getAllSubject()
        },

        methods: {
            getAllSubject() {
                        
                axios.get(`${this.$store.state.apiLink}/subject/list-subjects`)
                .then(res => {
                    if(res.data.successes){
                        this.dataSubject = res.data.data
                    } 
                })
                .catch(err => err);
            },
        }
    };
</script>
