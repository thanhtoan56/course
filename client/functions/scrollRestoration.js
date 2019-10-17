import Vue from "vue"
Vue.mixin({
    created() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto';
        }
    }
})