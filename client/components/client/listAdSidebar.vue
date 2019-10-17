<template>
    <div class="listAdSidebar" v-if="$store.state.dataAdds != ''">
        <template v-for="(data, index) in $store.state.dataAdds">
            <div class="item-add-sidebar item-left" v-if="data.posision == 4" :key="index">
                <a  v-bind:href="data.link" target="_BLANK" >
                    <img v-bind:src="$store.state.apiApp + 'advertisements/' + data.image_advertisement" alt="">
                </a>
            </div>        
            <div class="item-add-sidebar item-right" v-if="data.posision == 5" :key="index">
                <a  v-bind:href="data.link" target="_BLANK" >
                    <img v-bind:src="$store.state.apiApp + 'advertisements/' + data.image_advertisement" alt="">
                </a>
            </div>
        </template>
    </div>
</template>

<script>
	export default {
		data(){ return{} }
	}
</script>