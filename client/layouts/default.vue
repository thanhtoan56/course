<template>
    <div id="sidebar" class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div class="app-main">
            <Sidebar />
            <div class="app-main__outer">
                <div class="app-main__inner">
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
import scrollRestoration from '~/functions/scrollRestoration'

export default {
    components:{ Header, Sidebar, Footer, },

    created() {
        this.$nuxt.$on("hideSidebar", data => {
            $("#sidebar").addClass('closed-sidebar')
            this.$forceUpdate();
        })
        this.$nuxt.$on("showSidebar", data => {
            $("#sidebar").removeClass('closed-sidebar')
            this.$forceUpdate();
        })
    }
}
</script>
