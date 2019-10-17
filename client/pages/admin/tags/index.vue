<template >
    <div>
        <div v-if="check">
            <AppPageHeader />
            <AppListTags />
        </div>
        <div v-else>
            <AppError/>
        </div>
    </div>
</template>   
<script>
    import AppListTags from '~/components/admin/tags/ListTags';
    import AppPageHeader from '~/components/admin/tags/PageHeader';
    import AppError from '~/layouts/error';
    import mixinDecentralize from '~/functions/decentralize';
    import mixinPermission from '~/functions/permission';
    
    export default {
        layout:"admin",
        components: { AppListTags, AppPageHeader, AppError },
        mixins: [mixinDecentralize, mixinPermission],
    }
</script>