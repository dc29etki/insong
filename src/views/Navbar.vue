<!DOCTYPE html>
<template>
  <nav class="navbar navbar-expand-md px-2 py-0">
    <div class="container">
      <span><img class="p-0 m-0" style="height: 85px;" src=".././assets/logo-top.png"/></span>
      <div class="user-button" @click="switchOpen()">
        <font-awesome-icon :icon="['fa', 'user-circle']" />
      </div>
      <div class="navbar-collapse" v-if="this.open">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="$auth.isAuthenticated">
            <li class="nav-item">
            <router-link to="/profile" class="nav-link font-weight-bold" style="margin-left:10px; color: #FF9A00 !important;">Profile</router-link>
          </li>
            <li class="nav-item">
              <a class="nav-link" @click="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <a @click="login" class="nav-link">Login</a>
            </li>
            <li class="nav-item">
              <a @click="register" class="nav-link">Register</a>
            </li>
          </template>
          <li class="nav-item">
            <router-link to="/help" class="nav-link">Help</router-link>
          </li>
          <li class="nav-item">
            <a href="https://www.freeprivacypolicy.com/live/82973711-c888-4374-8d04-91f11e0cd462" class="nav-link">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </div>  
    <div class="space"> </div>  
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios';
export default {
  data() {
    var open = false;
    return {
      open,
    }
  },
  methods: {
    switchOpen() {
      if (this.open== true) {
        this.open = false;
      }
      else this.open = true;
    },
  login() {
        this.$auth.loginWithRedirect();
      },
  register() {
      this.$auth.loginWithRedirect();
          },
    signOut() {
      this.$auth.logout({
              returnTo: window.location.origin
            });
    }
  },
    created() {
      
    }
};
</script>

<style lang="scss">
  .user-button {
    border-radius:50%;
    background: white;
    color: #545454;
    display: flex;
    font-size: 40px;
    align-items: center;
    justify-content: center;
    .collapse, .collapsed {
      border: none !important;
    }
  }
  .nav-link {
    color: #545454 !important;
    margin-left: 10px;
  }
  .navbar {
    z-index: 99;
    color: white;
    background: #EFEFEF;   
    position: fixed !important;
    height: 100px;
    width: 100%;
    .navbar-brand {
      color: #545454 !important;
    }

  }
  .navbar-brand {
    color: white;
  }
  
  
  
  @media only screen and (min-width: 767px) {
    .user-button {
      display: none;
    }
  }
</style>