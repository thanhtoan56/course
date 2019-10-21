<template>
     <div class="app-wrapper-footer">
        <div class="app-footer">
            <div class="app-footer__inner">
                <div class="app-footer-left">
                    <ul class="nav">
                        <li class="nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                Footer Link 1
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                Footer Link 2
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="app-footer-right">
                    <ul class="nav">
                        <li class="nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                Footer Link 3
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <div class="badge badge-success mr-1 ml-0">
                                    <small>NEW</small>
                                </div>
                                Footer Link 4
                            </a>
                        </li>
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

