<template >
    <div>
        <div v-if="check">
            <AppPageHeader />
            <AppListCategory />
        </div>
        <div v-else>
            <AppError />
        </div>
    </div>
</template>   
<script>
    import AppListCategory from '~/components/admin/categories/ListCategory';
    import AppAddCategory from '~/components/admin/categories/AddCategory';
    import AppPageHeader from '~/components/admin/categories/PageHeader';
    import AppError from '~/layouts/error';
    import mixinDecentralize from '~/functions/decentralize';
    import mixinPermission from '~/functions/permission';
	
    export default {
        layout:"admin",
        components: { AppListCategory, AppAddCategory, AppPageHeader, AppError },
        mixins: [mixinDecentralize, mixinPermission],
    }
</script>