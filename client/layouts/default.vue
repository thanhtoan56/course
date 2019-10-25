<template>
    <div id="sidebar" class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div class="app-main">
            <Sidebar />
            <div class="app-main__outer">
                <div class="app-main__inner">
                    <div class="app-page-title">
                        <div class="page-title-wrapper">
                            <div class="page-title-heading">
                                <div class="page-title-icon" style="padding: 0.6rem; width: 75px; height: 75px;">
                                    <!-- <i class="pe-7s-car icon-gradient bg-mean-fruit"></i> -->
                                    <img src="/assets/images/cntt.png" alt="" style="max-width: 100%;">
                                </div>
                                <div>
                                    <span style="font-weight: 600; color: #ed1c24;">TRANG ĐĂNG KÝ ĐỀ TÀI ĐỒ ÁN - LUẬN VĂN KHOA CNTT</span>
                                    <div class="page-title-subheading">Trường ĐH Tôn Đức Thắng</div>
                                    <div class="page-title-subheading">Khoa Công Nghệ Thông Tin</div>
                                </div>
                            </div>
                            <!-- <div class="page-title-actions">
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
                            </div>     -->
                        </div>
                    </div>
                    <nuxt />
                </div>
                <Footer />
            </div>
        </div>
    </div>
</template>
<script>

import Vue from "vue";
import Header from '~/components/header';
import Sidebar from '~/components/sidebar';
import Footer from '~/components/footer';

export default {
    components:{ Header, Sidebar, Footer },

    created() {
        this.$nuxt.$on("hideSidebar", data => {
            $("#sidebar").addClass('closed-sidebar')
            this.$forceUpdate();
        })

        this.$nuxt.$on("showSidebar", data => {
            $("#sidebar").removeClass('closed-sidebar')
            this.$forceUpdate();
        })

        this.$nuxt.$on("hideSidebarMobile", data => {
            $("#sidebar").removeClass('sidebar-mobile-open')
            this.$forceUpdate();
        })
        
        this.$nuxt.$on("showSidebarMobile", data => {
            $("#sidebar").addClass('sidebar-mobile-open')
            this.$forceUpdate();
        })
    }
}
</script>
