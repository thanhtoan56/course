import Vue from "vue"
Vue.mixin({
    methods: {
        seenProductDetail(list){
            this.$root.$router.push({ path: `/product/${list.link}`})
        },
    }
})