<template>
  <div id="home" class="has-footer has-header">
    <navbar></navbar>
    <h2 class="text-center mt-5">Welcome to InSong</h2>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from './layout/Footer';
import Header from './layout/Header';
import navbar from './Navbar.vue';
  export default {
    name: 'Home',
    components: {Footer, navbar},
    inject: [],
    data() {
      let message= "nice";
      const headerControls = {
        left: {
          isImage: true,
          text: null,
          component: "",
          icon: "logo-w"
        },
        right: {
          isImage: true,
          text: null,
          component: "",
          icon: "search_grey"
        },
        center: {
          isImage: false,
          text: "InSong",
          component: "home",
          icon: ""
        }
      }
      return {
        headerControls
      }
    },
    methods: { }
  }
</script>
<style lang="scss">
  html, body {
    color: white;
    height: 100%;
    background: #7B9FCF;
  }
  h1 {
    font-weight:900;
  }
</style>
