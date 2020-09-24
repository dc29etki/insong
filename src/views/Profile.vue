<template>
  <div id="profile">
  <div class="pb-5 mb-5"> </div>
  
    <h2 class="text-center m-3">Profile</h2>
    <div class="p-3 m-3 border text-center">
      <img style="height:10vh;" :src="$auth.user.picture">
      <div class="font-weight-bold py-3">{{ $auth.user.name.toUpperCase() }}</div>
      <div class>Email: {{ $auth.user.email }}</div>
      <div class="btn btn-danger m-3" @click="signOut">Log Out</div>
    </div>
  </div>
</template>

<style lang="scss">
  #profile {
    height: auto;
    background: #14213d;
    overflow: scroll;
    color: white;
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