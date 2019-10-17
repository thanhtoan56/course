<template >
    <div>
        <div v-if="check">
            <AppPageHeader />
            <AppListContent />
        </div>
        <div v-else><AppError /></div>
    </div>
</template>   
<script>
    import AppListContent from '~/components/admin/contents/ListContent';
    import AppPageHeader from '~/components/admin/contents/PageHeader';
    import AppError from '~/layouts/error';
    import mixinDecentralize from '~/functions/decentralize';
    import mixinPermission from '~/functions/permission';
    
    export default {
        layout:"admin",
        components: { AppListContent, AppPageHeader, AppError },
	    mixins: [mixinDecentralize, mixinPermission],
    }
</script>