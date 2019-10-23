<template>
     <div class="app-wrapper-footer">
        <div class="app-footer" style="height: 90px">
            <div class="app-footer__inner" style="height: 90px">
                <div class="app-footer-left">
                    <ul class="nav">
                        <li class="btn-group nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <!-- <i class="nav-link-icon fa fa-edit"></i> -->
                                <i class="nav-link-icon fa fa-home"></i>
                                Địa chỉ: Phòng C004, Số 19 Nguyễn Hữu Thọ, P. Tân Phong, Quận 7, Tp. Hồ Chi Minh
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <!-- <i class="nav-link-icon fa fa-database"> </i> -->
                                <i class="nav-link-icon fa fa-phone"> </i>
                                Điện thoại: (028) 37755046 - (028) 37755046
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="app-footer-right">
                    <ul class="nav">
                        <li class="nav-item">
                            <a target="_blank" href="https://www.facebook.com/nguyenthanh.toan.68" class="nav-link">Copyright © NguyenThanhToan 2019</a> 
                        </li>
                        <!-- <li class="nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <div class="badge badge-success mr-1 ml-0">
                                    <small>NEW</small>
                                </div>
                                Footer Link 4
                            </a>
                        </li> -->
                    </ul>
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
                
            };
        },
        
        created() { },

        computed: { },
        
        mounted(){ },
        
        watch: { },
        
        methods: { }
    };
</script>
<style>
    .nav>li>a {
        position: relative;
        display: block;
        padding: 5px 15px;
    }
</style>

