<template>
    <div>
        dsad
    </div>
</template>
<script>
export default {
    created(){
        this.userLogin();
        // console.log(location.href.split("?token=")[1])
    },
    methods: {
        userLogin(){
            // localStorage.setItem("token", this.$route.params.id)
            localStorage.setItem("token", location.href.split("?token=")[1].split("#")[0])
            window.opener.CallParent(localStorage.token)
            window.close()
        }
    }
}
</script>