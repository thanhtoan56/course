const pkg = require('./package')
import axios from 'axios';
module.exports ={
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    // title: pkg.name,
    title: 'Course',
    meta: 
    [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: 
    [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'/styles/css/all.css'},
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { rel: 'stylesheet', href:'/styles/css/bootstrap.min.css'},
      { rel: 'stylesheet', href:'/styles/shards-dashboards.1.1.0.min.css'},
      { rel: 'stylesheet', href:'/styles/extras.1.1.0.min.css'},
      { rel: 'stylesheet', href:'/styles/font-awesome.min.css'},
      // { rel: 'stylesheet', href:'/styles/app.css'},
      // { rel: 'stylesheet', href:'/styles/style.css'},
      { rel: 'stylesheet', href:'/main.css'},
      { rel: 'stylesheet', href:'/styles/owl.carousel.min.css'},
      { rel: 'stylesheet', href:'/styles/dataTables.min.css'},
      { rel: 'stylesheet', href:'/styles/jquery.mmenu.all.css'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=vietnamese'}
    ],
    script:
    [   
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.3/mobile-detect.min.js'},
      {src: '/assets/scripts/main.js'},
      {src: '/js/jquery1.9.1.min.js'},
      {src: '/js/dataTables.min.js'},
      {src: '/js/popper.min.js'},
      {src: '/js/bootstrap.min.js'},
      {src: '/js/shards.min.js'},
      {src: '/js/jquery.sharrre.min.js'},
      {src: '/js/extras.1.1.0.min.js'},
      {src: '/js/owl.carousel.min.js'},
      {src: '/js/jquery.mmenu.all.js'},
      // {src: 'https://buttons.github.io/buttons.js'},
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  performance: {
    hints: false
  },
  /*
  ** Global CSS
  */
  css: [
    
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  router: {
    middleware: 'authentication',

    extendRoutes (routes, resolve) {
      
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  
}

