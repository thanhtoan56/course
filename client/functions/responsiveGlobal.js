import Vue from "vue"
Vue.mixin({
    computed: {
        checkResponsive(){
            var md = new MobileDetect(window.navigator.userAgent)
            if (md.tablet() == null && md.mobile() != null) return false
            return true
            
        },
        checkTablet(){
            var md = new MobileDetect(window.navigator.userAgent)
            if (md.tablet() != null ) return true;
            return false
        },
    }
})