<!DOCTYPE html>
<template>
  <div id="profile">
  <div class="pb-5 mb-5"> </div>
  
    <h2 class="text-center m-3">Greetings Center</h2>
    <div class="p-3 m-3 text-center d-flex flex-column align-items-center">
      <router-link to="/order" class="btn btn-insong1 my-3">Send Greeting</router-link>
      <router-link to="/my-orders" class="btn btn-insong1 my-3">My Greetings</router-link>
    </div>
  </div>
</template>

<style lang="scss">
  #profile {
    height: auto;
    background: white;
    overflow: scroll;
    color: #232323;
    .white {
      color: white !important;
    }
  }
  .formf {
    color: white;
    font-size: 18px;
    .label {
      float: left;
    }
  }
  .btn-insong1 {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 20vh;
    width: 20vh;
    border-radius: 50%;
    background: #FF9A00;
    color: white;
    font-weight: 700;
    font-size: 24px;
  }
</style>

<script>
import axios from 'axios';
export default {
    name: 'Profile',
    components: {},
    inject: [],
    data() {    
    var hi = "hi;"  
      return {
        hi
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