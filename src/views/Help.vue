<!DOCTYPE html>
<template>
  <div id="help">
  <div class="pb-5 mb-5"> </div>
  
    <h2 class="text-center m-3">Help and Support</h2>
    <div class="buttons2">
      <a href="mailto:walter@walterburmer.com?subject=Order Help" class="btn btn-dark">Help with an order</a>
      <a href="mailto:walter@walterburmer.com?subject=App Help" class="btn btn-dark">Help with the app</a>
      <a href="mailto:walter@walterburmer.com?subject=Greeter Support" class="btn btn-dark">Greeter Support</a>
    </div>
  </div>
</template>

<style lang="scss">
  #help {
    height: auto;
    background: white;
    overflow: scroll;
    color: #232323;
    .white {
      color: white !important;
    }
  }
  .buttons2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btn {
      margin: 10px 25px;
      padding: 10px;
    }
  }
</style>

<script>
import axios from 'axios';
export default {
    name: 'Help',
    components: {},
    inject: [],
    data() {    
      return {
      }
    },
    methods: {
      login() {
        this.$auth.loginWithRedirect();
      },
      signOut() {
        this.$auth.logout({
          returnTo: window.location.origin
        });
      }
    },
}
</script>