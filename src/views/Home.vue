<!DOCTYPE html> 
<template>
  <div id="home" class="has-footer has-header">    
    <div class="pb-5 mb-5"> </div>
    
    <div class="home-area m-2 text-center">
    <img style="height:17.5vh;" src=".././assets/logo-main.png"/>
    
      
      <button @click="logout()" class="hidden">signout</button>
      
      <div class="sections">
        
        <div class="s1">
          <p>
            InSong Greetings is an on-demand greeting service. Well-qualified singing greeters call that special someone in your life to perform a personalized greeting designed by you and sing to them a song of your choice live over the phone! Our greeters let your loved ones know they are important and recognized on their special occasion!
          </p>
          <h5 class="font-italic">"When you write them, they feel recognized. When you serenade them, they feel like a monarch."</h5>
        </div>
      
        <div v-if="!$auth.isAuthenticated" class="s2">
          <hr>
          <h4>Login or Create an Account Today!</h4>
          <a @click="login" class="btn btn-orange m-2">Login</a>
          <a @click="login" class="btn btn-orange m-2">Sign Up</a>
        </div>
        <div v-else class="s2">
          <hr>
          <h4>Welcome back, {{$auth.user.name}}!</h4>
          <router-link to="/order" class="btn btn-orange m-2">Send a greeting now!</router-link>
          <router-link class="btn btn-orange m-2" to="/my-orders">My Greetings</router-link>
        </div>
      
        <div class="s3">
          <hr>
          <h4>Interested in Being a Greeter?</h4>
          <a href="mailto:walter@walterburmer.com?subject=Greeter Application" class="btn btn-orange m-2 text-white">Apply Now</a>
        </div>
        
      </div>
      
    
    </div>
    <div class="pb-5 mb-5"> </div>
    
  </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'home',
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
    background: white;
    overflow: scroll;
  }
  #home {
    height: auto;
    background: white;
    color: black !important;
    overflow: scroll;
    p {
      color: black;
    }
    .hidden {
      display: none;
    }
  }
  h1 {
    font-weight:900;
  }
  h2 {
    color: #FF9A00;
  }
  .home-area {    
  }
  .sections {
    text-align: center;
    margin: 10px;
    color: #232323;
    .s1 {
      h4 {
        color: #232323;
        font-size: 22px;
      }
      margin-left: auto;
      margin-right: auto;
      font-size: 12px;
    }
    .s2, .s3 {
      h4 {
        color: #232323;
        font-size: 18px;
      }
    }
  }
  hr {
    background: black;
    color: #232323;
  }
  .btn-orange {
    background: #FF9A00;
  }
  .btn-orange:hover{
      color: white;
    }
</style>
