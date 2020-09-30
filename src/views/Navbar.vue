<!DOCTYPE html>
<template>
  <nav class="navbar navbar-expand-md px-2 py-0">
    <div class="container">
      <span><img class="p-0 m-0" style="height: 9vh;" src=".././assets/logo-top.png"/></span>
      <div
        class="user-button mx-2"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span><font-awesome-icon :icon="['fa', 'user-circle']" /></span>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="$auth.isAuthenticated">
            <router-link to="/profile" class="nav-item font-weight-bold" style="margin-left:10px; color: #FF9A00;">Profile</router-link>
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
        </ul>
      </div>
    </div>    
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
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
</style>