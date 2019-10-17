export default {
    computed:{
        check() {
            if (this.$store.state.userInfo && this.$store.state.userInfo !== "") {
                if (this.$store.state.userInfo.data && this.$store.state.userInfo.data !== "") {
                    return this.$store.state.userInfo.data.auth_admin === 'Y' ? true  : false
                }
            }
        }
    }
}