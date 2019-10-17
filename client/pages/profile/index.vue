<template>
	<div id="cateMain" >
		<div class="has-categories-list">
			<div class="full-breadcumb">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul class="breadcrumb">
							    <li><nuxt-link to='/'>Trang chủ</nuxt-link></li>
								<li style="width: 50%;"><a href="javascript:void(0)"><span>THÔNG TIN TÀI KHOẢN </span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="profile"> <IndexProfile /> </div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import IndexProfile from "~/components/client/profile/index"
	
	export default {
		components:{ IndexProfile},
	}
</script>