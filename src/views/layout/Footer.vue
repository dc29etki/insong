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
      <div class="d-flex justify-content-center" v-if="this.isGreeter">
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
          path: "/my-orders"
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
      async getGreeters() {
        const token = await this.$auth.getTokenSilently();
        let url = new URL('https://insong-066b.restdb.io/rest/greeters')
        let json = {
          "user_email": this.$auth.user_email
        };
        url.searchParams.set('q', JSON.stringify(json))
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.greeter = data[0];
        if(this.greeter != ''){
          this.isGreeter = true;
          this.links = [
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
              path: "/my-orders"
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
        }
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
      this.getGreeters();
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
