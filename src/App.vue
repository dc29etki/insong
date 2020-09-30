<template>
  <div>
    <navbar></navbar>
    <main>
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
