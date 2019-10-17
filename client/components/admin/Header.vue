<template>
    <div>
        <div v-show="check" class="main-navbar sticky-top bg-white">
            <div class="view-website" style="position: absolute;left: 25px;top: 20px;z-index: 1">
                <a href="/" target="_blank" style="display: block;cursor: pointer;"><i style="font-size: 22px" class="fa fa-eye"></i></a>
            </div>
            <nav class="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                <ul class="navbar-nav border-left flex-row" style="position: absolute;right: 20px;bottom: -5px;border-left: 0!important;">
                    <div class="view-website" style="position: absolute; left: -20px;top: 25px;z-index: 1">
                        <nuxt-link to="/admin/notification"  style="display: block;cursor: pointer;"><i style="font-size: 22px" class="fa fa-bell"><div v-if="checkNotification" class="notification"></div></i></nuxt-link>
                    </div>
                    <li class="nav-item dropdown" v-if="check">
                        <nuxt-link class="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown" to="#" role="button"
                            aria-haspopup="true" aria-expanded="false">
                            <img class="user-avatar rounded-circle mr-2" src="/images/avatars/0.jpg" alt="User Avatar">
                            <span class="d-none d-md-inline-block" v-show="check">{{$store.state.userInfo.data.username}}</span>
                        </nuxt-link>
                        <div class="dropdown-menu dropdown-menu-small">
                            <nuxt-link class="dropdown-item" to="/admin">
                                <i class="material-icons">&#xE7FD;</i> Profile</nuxt-link>
                            <nuxt-link class="dropdown-item" to="/admin">
                                <i class="material-icons">vertical_split</i> Blog Posts</nuxt-link>
                            <nuxt-link class="dropdown-item" to="/admin">
                                <i class="material-icons">note_add</i> Add New Post</nuxt-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-danger" @click="logOut" style="cursor: pointer;"><i class="material-icons text-danger">&#xE879;</i> Logout </a>
                        </div>
                    </li>
                </ul>
                <nav class="nav">
                    <nuxt-link to="#" class="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left"
                        data-toggle="collapse" 
                        data-target=".header-navbar" 
                        aria-expanded="false"
                        aria-controls="header-navbar">
                        <i class="material-icons">&#xE5D2;</i>
                    </nuxt-link>
                </nav>
            </nav>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import axios from "axios"
    
    export default {
        data(){ return {} },
        computed: {
            check() { return this.$store.state.userInfo.successes ? true : false },
            
            checkNotification() { return this.$store.state.userNotification != "" ? true : false }
        },
        methods:{
            logOut(){
                this.$store.dispatch('clearAutUser',true);
                this.$router.replace({path:'/admin/login'})
            }
        }
    }
</script>