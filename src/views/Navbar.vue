<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <span><img style="height: 6vh;" src=".././assets/logo.png"/></span>
      <router-link to="/" class="navbar-brand">InSong</router-link>
      <div
        class="user-button"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span><font-awesome-icon :icon="['fa', 'user']" /></span>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="$auth.isAuthenticated">
            <router-link to="/profile" class="nav-item">{{$auth.user.name}}</router-link>
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
    color: black;
    display: flex;
    padding: 10px;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    .collapse, .collapsed {
      border: none !important;
    }
  }
  .navbar {
    color: white;
    background: black;   
    position: fixed !important;
    width: 100%;
    .navbar-brand {
      color: #fca311 !important;
    }
    a {
      color: white !important;
    }
  }
  .navbar-brand {
    color: white;
  }
</style>