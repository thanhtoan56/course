<template >
    <div>
        <div v-if="check">
            <AppPageHeader />
            <AppListAdvertisement />
        </div>
        <div v-else>
            <AppError />
        </div>
    </div>
</template>   
<script>
    import AppListAdvertisement from '~/components/admin/advertisement/ListAdvertisement';
    import AppPageHeader from '~/components/admin/advertisement/PageHeader';
    import AppError from '~/layouts/error';
    import mixinDecentralize from '~/functions/decentralize';
    import mixinPermission from '~/functions/permission';
    
    export default {
        layout:"admin",
        components: { AppListAdvertisement, AppPageHeader, AppError },
	    mixins: [mixinDecentralize, mixinPermission],
    }
</script>