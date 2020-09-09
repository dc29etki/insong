<template>
  <div id="home" class="has-footer has-header">    
    <div class="home-area m-3 text-center">
    <img style="height: 20vh;" src=".././assets/logo.png"/>
    
    <h2 class="text-center">Welcome to InSong</h2>
      
      <button @click="logout()">signout</button>
      
      <div class="sections">
        
        <div class="s1">
          <hr>
          <h4>Who We Are</h4>
          <p>InSong is an on-demand live-audio greeting delivery service. Well-qualified singing greeters call that special someone in your life and perform a surprise greeting of your choice live over the phone. InSong delivers regular or customized greetings, in song form. </p>
        </div>
      
        <div class="s2">
          <hr>
          <h4>Login or Create an Account Today!</h4>
          <a href="/login" class="btn btn-dark m-2">Login</a>
          <a href="/register" class="btn btn-dark m-2">Sign Up</a>
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
import Footer from './layout/Footer';
import Header from './layout/Header';
import navbar from './Navbar.vue';
import { mapGetters } from "vuex";
import firebase from 'firebase';
import axios from 'axios';
export default {
    name: 'Home',
    components: {},
    inject: [],
    data() {
      let message= "nice";
      var orders = [];
      var token = this.$auth.getTokenSilently();
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
        headerControls,
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
          }
    }
  }
</script>
<style lang="scss">
  html, body {
    height: 100%;
    overflow: scroll;
  }
  #home {
    height: 100vh;
    background: #14213d;
    overflow: hidden;
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
