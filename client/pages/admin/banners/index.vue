<template >
    <div>
        <div v-if="check">
            <AppPageHeader />
            <AppListBanner />
        </div>
        <div v-else>
            <AppError />
        </div>
    </div>
</template>   

<script>
    import AppPageHeader from '~/components/admin/banners/PageHeader';
    import AppListBanner from '~/components/admin/banners/ListBanner';
    import AppError from '~/layouts/error';
    import mixinDecentralize from '~/functions/decentralize';
    import mixinPermission from '~/functions/permission';
	
    export default {
        layout:"admin",
        components: { AppPageHeader, AppListBanner, AppError },
	    mixins: [mixinDecentralize, mixinPermission],
    }
</script>