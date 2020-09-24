<!DOCTYPE html>
<template>
  <div id="order" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">   
      <div class="pb-5 mb-5"> </div>
       
    <h2 class="text-center">Available Orders</h2>
    <h6>Select order to add to your queue.</h6>
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link>
    
    <div v-if="orders.length<1" class="border m-5 p-4">No orders right now, check back later</div>
    <div class="text-left p-3 m-3 mx-auto">
      <div class="box1" v-for="o in sortedOrders" :key="o">
        <div class="item">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Type: {{o.type}}
          <br>
          Created: {{moment(o.created_at).format('MM-DD-YYYY')}}
          <div class="btn btn-primary" @click="addOrder(o._id)">Add to Queue</div>
        </div>
      </div>
            
    </div>
    
    </div>
    
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment'
export default {
    name: 'GreeterOrders',
    components: {},
    inject: [],
    data() {      
      var orders = [];
      var sortedOrders = [];
      var objectkeys = {};
      var user = "";
      return {
        moment,
        orders,
        sortedOrders,
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
        login() {
          this.$auth.loginWithRedirect();
        },
        logout() {
          this.$auth.logout({
            returnTo: window.location.origin
          });
        },
        async getGreeters() {
          const token = await this.$auth.getTokenSilently();
          const { data } = await axios.get("https://insong-066b.restdb.io/rest/greeters", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          for(var i=0; i<data.length; i++) {
            if(data[i].user_email == this.$auth.user.email) {
              this.greeter = data[i];
            }
          }
          if(this.greeter == ""){
            this.$router.push({path: '/'});
          }
        },   
        postOrder(){
          var url = "https://insong-066b.restdb.io/rest/";
          const token = this.$auth.getTokenSilently();
          console.log(token);
          axios.get(url)
        },
        async addOrder(id) {
          console.log(id);
          const token = await this.$auth.getTokenSilently();
          axios.put("https://insong-066b.restdb.io/rest/orders/"+id,
          {
            status: "In Queue",
            greeter: this.greeter.email
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          }).then(this.$router.push({path: "/switchboard"}));
        },
        async getOrders() {
          const token = await this.$auth.getTokenSilently();
          const { data } = await axios.get("https://insong-066b.restdb.io/rest/orders", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          for(var i=0; i<data.length; i++) {
            if(data[i].status == 'Posted') {
              this.orders.push(data[i])
            }
          }
          this.sortedOrders = this.orders.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        },
        async postOrders() {
          const token = await this.$auth.getTokenSilently();
          axios.post("https://insong-066b.restdb.io/rest/orders",
          {
            recipient: this.formData.recipient,
            song: this.formData.song,
            sender: this.$auth.user.name,
            auth0_user_id: this.$auth.user.sub,
            created_at: Date.now()
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          }).then(this.$router.push({path: "/"}));

        }
    },
    created() {
      this.getOrders();
      this.getGreeters();
    }
    
  }
</script>
<style lang="scss">
  #order {
    height: auto;
    background: #14213d;
    overflow: scroll !important;
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
    font-size: 18px;
    .label {
      float: left;
    }
  }
  .box1 {
    display: flex;
    .item {
      border: 3px solid white;
      width: 100%;
      padding: 10px;
      margin: 10px;
    }
  }
</style>
