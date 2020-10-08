<!DOCTYPE html>
<template>
  <nav class="navbar navbar-expand-md px-2 py-0">
    <div class="container">
      <span><img class="p-0 m-0" style="height: 9vh;" src=".././assets/logo-top.png"/></span>
      <div
        class="user-button mx-2"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <font-awesome-icon :icon="['fa', 'user-circle']" />
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
        </ul>
      </div>
    </div>    
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios';
export default {
  methods: {
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