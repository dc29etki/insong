<template>
  <div id="order" class="has-footer has-header">
    <navbar></navbar>
    
    <div class="home-area m-3 text-center">    
    <h2 class="text-center">Order</h2>
    
    <div class="formf">
        <form>
          <label>First Name</label>
          <input type="text" v-model="formData.firstname" class="span3">
          <br>
          <label>Last Name</label>
          <input type="text" v-model="formData.lastname" class="span3">
          <br>
          <label>Order Type</label>
          <input type="type" v-model="formData.ordertype" class="span3">
          <br>
          <input type="submit" value="Submit" @click="postOrder()" class="btn btn-primary pull-right">
          <div class="clearfix"></div>
        </form>
    </div>
    
    Orders: {{this.orders['-MGimxozWBlUsIZyrNUT']}}
    
    
    </div>
    
    <Footer></Footer>
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
    components: {Footer, navbar},
    inject: [],
    data() {      
      var orders = {};
      var objectkeys = {};
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
        formData: {
          firstname: '',
          lastname: '',
          ordertype: ''
        }
      }
    },
      computed: {
        ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
          user: "user"
        })
      },
    methods: {
      getOrders() {
        var url = 'https://insong-94de5.firebaseio.com/';
        this.$axios
          .get(url + 'orders.json')
          .then(response => {
            this.orders = response.data;
            console.log(response.data)
            var yourObject = response.data
            var keys = Object.keys(yourObject);
            for(var i=0; i<keys.length; i++){
                var key = keys[i];
                console.log(key, yourObject[key].useremail);
                console.log("user", this.user)
                if(yourObject[key].useremail=='test5@test5.com'){
                  console.log("hi")
                }
            }
          })
          .catch((err) => {
            // do something with. the error
          })
      },
      postOrder() {
        console.log("click")
        var url = 'https://insong-94de5.firebaseio.com/';
        this.$axios
          .post(url + 'orders.json', {
            useremail: this.user.data.email,
            ordertype: this.formData.ordertype
          })
          .then(response => {
            console.log(response.data)
          })
          .catch((err) => {
            // do something with. the error
          })
      }
    },
    mounted() {
      this.getOrders();
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
