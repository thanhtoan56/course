export default {
    created(){
        // if ( !this.$store.state.userInfo.successes) { this.$router.push({path:'/login'})  } 
        // else {
        //     if(this.$store.state.userInfo.data.link === "N" || this.$store.state.userInfo.data.name_shop === "N") { this.$router.replace({path:'/admin/login'})  } 
        //     else return this.$store.state.userInfo
        // } 
    },
    computed:{
        userInfo(){ if (this.$store.state.userInfo && this.$store.state.userInfo !== "") { return this.$store.state.userInfo; } },
    }
}