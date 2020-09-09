<template>
  <div id="order" class="has-footer has-header">
    
    <div class="home-area m-3 text-center">    
    <h2 class="text-center">Order</h2>
    
    <div class="formf">
        <form>
          <label>Recipient</label>
          <input type="text" v-model="formData.recipient" class="span3">
          <br>
          <label>Song</label>
          <input type="type" v-model="formData.song" class="span3">
          <br>
          <input type="submit" value="Submit" @click="postOrders()" class="btn btn-primary pull-right">
          <div class="clearfix"></div>
        </form>
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
      var orders = {};
      var objectkeys = {};
      var user = "";
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
        orders,
        objectkeys,
        user,
        apiMessage: "",
        formData: {
          recipient: '',
          song: '',
        }
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
          
          postOrder(){
            var url = "https://insong-066b.restdb.io/rest/";
            const token = this.$auth.getTokenSilently();
            console.log(token);
            axios.get(url)
            },
        async getOrders() {
          const token = await this.$auth.getTokenSilently();
          const { data } = await axios.get("https://insong-066b.restdb.io/rest/orders", {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          });

          this.apiMessage = data;
        },
        async postOrders() {
          const token = await this.$auth.getTokenSilently();
          axios.post("https://insong-066b.restdb.io/rest/orders",
          {
            recipient: this.formData.recipient,
            song: this.formData.song,
            user: this.$auth.user
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          }).then(this.$router.push({path: "/"}));

        }
    },
    mounted() {
      
    }
    
  }
</script>
<style lang="scss">
  html, body {
    height: 100%;
    overflow: scroll;
  }
  #order {
    height: 100vh;
    background: #14213d;
    overflow: scroll;
    color: white;
  }
  h1 {
    font-weight:900;
  }
  h2 {
    color: #fca311;
  }
  .formf {
    color: white;
  }
</style>
