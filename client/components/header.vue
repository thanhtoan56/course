<template>
    <div class="app-header header-shadow">
        <div class="app-header__logo">
            <div class="logo-src"></div>
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
                        <a href="javascript:void(0);" class="nav-link">
                            <i class="nav-link-icon fa fa-database"> </i>
                            Statistics
                        </a>
                    </li>
                    <li class="btn-group nav-item">
                        <a href="javascript:void(0);" class="nav-link">
                            <i class="nav-link-icon fa fa-edit"></i>
                            Projects
                        </a>
                    </li>
                    <li class="dropdown nav-item">
                        <a href="javascript:void(0);" class="nav-link">
                            <i class="nav-link-icon fa fa-cog"></i>
                            Settings
                        </a>
                    </li>
                </ul>        </div>
            <div class="app-header-right">
                <div class="header-btn-lg pr-0">
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="btn-group">
                                    <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
                                        <img width="42" class="rounded-circle" src="assets/images/avatars/1.jpg" alt="">
                                        <i class="fa fa-angle-down ml-2 opacity-8"></i>
                                    </a>
                                    <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                                        <button type="button" tabindex="0" class="dropdown-item">User Account</button>
                                        <button type="button" tabindex="0" class="dropdown-item">Settings</button>
                                        <h6 tabindex="-1" class="dropdown-header">Header</h6>
                                        <button type="button" tabindex="0" class="dropdown-item">Actions</button>
                                        <div tabindex="-1" class="dropdown-divider"></div>
                                        <button type="button" tabindex="0" class="dropdown-item" @click="userLogout()">Logout</button>
                                    </div>
                                </div>
                            </div>
                            <div class="widget-content-left  ml-3 header-user-info">
                                <div class="widget-heading">
                                    Alina Mclourd
                                </div>
                                <div class="widget-subheading">
                                    VP People Manager
                                </div>
                            </div>
                            <div class="widget-content-right header-user-info ml-3">
                                <button type="button" class="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                                    <i class="fa text-white fa-calendar pr-1 pl-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
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
    import mixinsResponsive from '~/functions/responsiveGlobal'
    import HeaderMobile from '~/components/client/headermobile';
    import i18n from '~/lang/i18n.js';

    import _ from 'lodash';

    Vue.use(VueLoading);
    Vue.use(VModal);
    Vue.use(VueCookies);
    Vue.use(Notifications);
    var md5 = require('md5');
    Vue.use(Toaster, {timeout: 10000});
    export default {
        components:{ HeaderMobile },
        i18n,
        data() {
            return {
                isShowButtonSideBar: true,
                isShowInputSearch: true,
            };
        },
        
        created() { },

        computed: { },
        
        mounted(){ },
        
        watch: { },
        
        methods: {
            userLogout(){ 
                this.$store.dispatch('clearAutUser',true);  
                this.$router.push({path:'/login'})
            },

            search(){

            },
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

