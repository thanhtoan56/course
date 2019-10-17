<template>
    <div class="container-fluid">
        <div class="row">
            <Left />
            <main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
                <Header />
                <div class="main-content-container container-fluid px-4">
                    <nuxt />
                    
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import Left from '../components/admin/Left';
import Header from '../components/admin/Header';
import Footer from '../components/admin/Footer';

export default {
    components:{ Left, Header, Footer, },
}
</script>