<!DOCTYPE html>
<template>
  <div>
    <navbar></navbar>
    <main class="c-main">
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
import navbar from "./views/Navbar";
import Footer from './views/layout/Footer';
export default {
  components: {
    navbar,
    Footer
  }
};
</script>
<style lang="scss">
  @media only screen and (min-width: 1200px) {
    .c-main {
      width: 75%;
      margin: 0 auto;
    }
  }
</style>