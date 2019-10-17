<template >
    <div>
        <AppPageHeader />
        <AppListProduct />
    </div>
</template>   
<script>
    import AppListProduct from '~/components/admin/products/ListProduct';
    import AppPageHeader from '~/components/admin/products/PageHeader';
    import mixinDecentralize from '~/functions/decentralize'

    export default {
        layout:"admin",
        components: { AppListProduct, AppPageHeader, },
        mixins: [mixinDecentralize],
    }
</script>