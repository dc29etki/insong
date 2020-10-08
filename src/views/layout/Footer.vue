<!DOCTYPE html>
<template>
  <div id="footer">
    <nav>
      <ul class="footer-navigation">
      <div class="d-flex justify-content-center" v-if="!this.isGreeter">
        <li v-bind:class="{'current': isCurrent(link)}" v-for="link in links.slice(0,3)" :key="link.label" v-on:click="routeTo(link.path)">
          <div style="font-size: 1.5rem;" class="mb-2"><font-awesome-icon :icon="link.icon" /><br></div>
          <span class="label">{{link.label}}</span>
        </li>
      </div>
      <div class="d-flex justify-content-center" v-else>
        <li v-bind:class="{'current': isCurrent(link)}" v-for="link in links.slice(0,4)" :key="link.label" v-on:click="routeTo(link.path)">
          <div style="font-size: 1.5rem;" class="mb-2"><font-awesome-icon :icon="link.icon" /><br></div>
          <span class="label">{{link.label}}</span>
        </li>
      </div>
      </ul>
    </nav>
  </div>
</template>
<script>
  import router from '../../router'
  import axios from 'axios';
  export default {
    name: 'Footer',
    inject: [],
    data() {
      var isGreeter = false;
      var greeter = '';
      var links = [
        {
          label: "Home",
          icon: "home",
          component: "home",
          path: "/"
        },
        {
          label: "Greetings Menu",
          icon: "circle",
          component: "order",
          path: "/order"
        },
        {
          label: "Greetings Center",
          icon: "handshake",
          component: "order",
          path: "/greetings-center"
        },
        {
          label: "Greeter Switchboard",
          icon: "microphone",
          component: "order",
          path: "/switchboard"
        }
      ];
      return {
        links,
        axios,
        isGreeter,
        greeter
      }
    },
    methods: {
      async isaGreeter() {
        const token = await this.$auth.getTokenSilently();
        let url = new URL('https://insong-066b.restdb.io/rest/greeters')
        let json = {
          "user_email": this.$auth.user.email
        };
        url.searchParams.set('q', JSON.stringify(json))
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(data[0]){
          this.isGreeter = true;
          return true;
        }
        else{this.isGreeter = false; return false;}
      }, 
      routeTo(path) {
        if(path=="/"){
          this.$router.push('home');
        }
        this.$router.push({ path: path })
      },
      isCurrent(link) {
        return router.currentRoute.name === link.component;
      }
    },
    mounted() {
      if(this.$auth.user){
        this.isGreeter = this.isaGreeter();
      }
      else {
        this.isGreeter = false;
      }
    }
  }
</script>
<style lang="scss">
  #footer {
    z-index: 99;
    background-color: #EFEFEF;
    color: #545454;
    padding:10px 0;
    padding-bottom: calc(env(safe-area-inset-bottom) + 10px);
    position:fixed;
    bottom:0;
    width:100vw;
    height: 10vh;
    .footer-navigation {
      list-style-type:none;
      color: #545454 ;
      margin: 0;
      padding: 0;
      li {
        flex:1;
        margin:0 10px;
        padding:0;
        font-size:10px;
        text-align:center;
        &.current {
          .label {
            color: green;
          }
        }
        div {
          height:24px;
        }
      }
    }
  }
</style>
