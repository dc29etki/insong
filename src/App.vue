<template>
  <div>
    <navbar></navbar>
    hi
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import navbar from "./views/Navbar";
export default {
  components: {
    navbar
  }
};
</script>