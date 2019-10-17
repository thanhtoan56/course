<template>
    <aside class="main-sidebar col-12 col-md-3 col-lg-2 px-0">
        <div class="main-navbar">
            <nav class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
                <nuxt-link class="navbar-brand w-100 mr-0" to="/admin" style="line-height: 25px;">
                    <div class="d-table m-auto">
                        <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 25px;"
                            src="/images/coin.jpg" alt="Shards Dashboard">
                        <span class="d-none d-md-inline ml-1">Blood Shopping Mall</span>
                    </div>
                </nuxt-link>
                <a class="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                    <i class="material-icons">&#xE5C4;</i>
                </a>
            </nav>
        </div>
        <form action="#" class="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
            <div class="input-group input-group-seamless ml-3">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
                <input class="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search">
            </div>
        </form>
        <div v-if="check" class="nav-wrapper">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin">
                        <i class="material-icons">dashboard</i>
                        <span>Home</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/users">
                        <i class="material-icons">person</i>
                        <span>User</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/categories">
                        <i class="material-icons">table_chart</i>
                        <span>Categories</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/banners">
                        <i class="material-icons">view_module</i>
                        <span>Banner</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/products/page/1">
                        <i class="material-icons">shopping_basket</i>
                        <span>Products</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/contents">
                        <i class="material-icons">ballot</i>
                        <span>Contents</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/tags">
                        <i class="material-icons">flag</i>
                        <span>Tags</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/advertisement">
                        <i class="material-icons">perm_media</i>
                        <span>Advertisement</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/orders">
                        <i class="material-icons">shopping_cart</i>
                        <span>Carts</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/reports">
                        <i class="material-icons">person</i>
                        <span>Report</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div v-if="!check" class="nav-wrapper">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin">
                        <i class="material-icons">dashboard</i>
                        <span>Home</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/users">
                        <i class="material-icons">person</i>
                        <span>User</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/products/page/1">
                        <i class="material-icons">shopping_basket</i>
                        <span>Products</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/orders">
                        <i class="material-icons">shopping_cart</i>
                        <span>List Order</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/admin/reports">
                        <i class="material-icons">person</i>
                        <span>Report</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </aside>
</template>
<style>
    .nuxt-link-exact-active i, .nuxt-link-exact-active span { color: #007bff!important }
</style>

<script>
    import Vue from "vue"
    
    export default {
        data() {
            return {
                isShowAdmin: false,
                isShowUser: false
            }
        },
        computed: {
            check() {
                if(this.$store.state.userInfo && this.$store.state.userInfo != ""){
                    if(this.$store.state.userInfo.data && this.$store.state.userInfo.data != ""){
                        if(this.$store.state.userInfo.data.auth_admin === 'Y'){ return true }
                        if(this.$store.state.userInfo.data.auth_admin === 'N') { return false }
                    }
                } else return ""
            }
        }
    }
</script>

<style scoped>
    .main-sidebar { position: fixed !important; }
</style>
