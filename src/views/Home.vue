<template>
  <div id="home" class="has-footer has-header">    
    <div class="home-area m-2 text-center">
    <img style="height: 20vh;" src=".././assets/logo.png"/>
    
    <h2 class="text-center">Welcome to InSong</h2>
      
      <button @click="logout()" class="hidden">signout</button>
      
      <div class="sections">
        
        <div class="s1">
          <hr>
          <h4>Who We Are</h4>
          <p>InSong is an on-demand live-audio greeting delivery service. Well-qualified singing greeters call that special someone in your life and perform a surprise greeting of your choice live over the phone. InSong delivers regular or customized greetings, in song form. </p>
        </div>
      
        <div v-if="!$auth.isAuthenticated" class="s2">
          <hr>
          <h4>Login or Create an Account Today!</h4>
          <a @click="login" class="btn btn-dark m-2">Login</a>
          <a @click="login" class="btn btn-dark m-2">Sign Up</a>
        </div>
        <div v-else class="s2">
          <hr>
          <h4>Welcome back, {{$auth.user.name}}!</h4>
          <a href="/order" class="btn btn-dark m-2">Send a greeting now!</a>
          <a class="btn btn-dark m-2" href="/profile">Profile</a>
        </div>
      
        <div class="s3">
          <hr>
          <h4>Interested in Being a Greeter?</h4>
          <a href="/login" class="btn btn-dark m-2">Apply Now</a>
        </div>
        
      </div>
    
    </div>
    
  </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Home',
    components: {},
    inject: [],
    data() {
      var orders = [];
      return {
        orders
      }
    },
      computed: {
      },
    methods: {
      // Log the user in
          login() {
            this.$auth.loginWithRedirect();
            
          },
          // Log the user out
          logout() {
            this.$auth.logout({
              returnTo: window.location.origin
            });
          },
          loggedIn() {
            if (this.$auth.isAuthenticated) return true;
            return false;
          }
    }
  }
</script>
<style lang="scss">
  html, body {
    height: 100%;
    background: #14213d;
  }
  #home {
    height: auto;
    background: #14213d;
    overflow: hidden !important;
    .hidden {
      display: none;
    }
  }
  h1 {
    font-weight:900;
  }
  h2 {
    color: #fca311;
  }
  .home-area {    
  }
  .sections {
    text-align: center;
    margin: 10px;
    color: #e5e5e5;
    .s1 {
      h4 {
        color: white;
        font-size: 22px;
      }
      margin-left: auto;
      margin-right: auto;
      font-size: 12px;
    }
    .s2, .s3 {
      h4 {
        color: white;
        font-size: 18px;
      }
    }
  }
  hr {
    background: white;
  }
</style>
