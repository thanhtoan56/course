<template>
	<div class="error-component">
		<img src="/images/404.png" alt="">
		<div class="link-link-error-component">
			<button class="btn btn-default" @click="$router.go(-1)"><i class="fa fa-angle-left"></i> Quay lại trang trước</button>

			<button class="btn btn-default" @click="goHome"><i class="fa fa-dashboard"></i> Trang chủ</button>

			<button class="btn btn-default" @click="goHome">Tiếp tục mua hàng <i class="fa fa-angle-right"></i></button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goHome(){ this.$router.push('/') }
		}
	}
</script>