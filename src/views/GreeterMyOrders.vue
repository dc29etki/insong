<!DOCTYPE html>
<template>
  <div id="myorders" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;"> 
      <div class="space pb-3 mt-3"> </div>
         
    <h2 class="text-center">My Orders</h2>
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link>
    
    
    <div class="alert alert-primary w-75 mx-auto my-5" v-if="loading">Loading...</div>
    <div v-if="!loading && orders.length<1" class="border m-5 p-4">No orders right now, check back later</div>
    <div class="text-left p-3 m-3 mx-auto">
      <div class="box2" v-for="o in orders" :key="o">
        <div class="item" v-if="o">
          Sent to: {{o.recipient_name}}
          <br>
          Status: {{o.status}}, {{o.calls}} calls
          <br>
          Song: {{o.song}}
          <br>
          Type: {{o.type}}
          <br>
          <span v-if="o.created_at">
            Created: {{o.created_at.split("T")[0]}}<br>
          </span>
          <span v-if="o.date_requested">
            Date Requested: {{o.date_requested.split("T")[0]}}
          </span><br>
          Time Requested: {{o.best_time}}<br>
          <router-link class="btn btn-primary" :to="{ name: 'GreeterOrder', params: { id: o._id }}">View Order</router-link>
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
    name: 'GreeterMyOrders',
    components: {},
    inject: [],
    data() {      
      var orders = [];
      var sortedOrders = [];
      var objectkeys = {};
      var user = "";
      var loading = true;
      return {
        moment,
        orders,
        sortedOrders,
        objectkeys,
        user,
        loading,
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
          this.greeter = data[0];
          console.log(this.greeter._id)
          if(this.greeter == ""){
            this.$router.push({path: '/'});
          }
          else {this.getOrders();}
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
          axios.patch("https://insong-066b.restdb.io/rest/orders/"+id,
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
          this.loading = true;
          const token = await this.$auth.getTokenSilently();
          let url = new URL('https://insong-066b.restdb.io/rest/orders')
          let json = {
            "greeter": this.greeter.user_email,
          };
          url.searchParams.set('q', JSON.stringify(json))
          console.log(url)
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          for(var i=0; i<data.length; i++) {
            if(data[i].status!="Completed"){
              this.orders.push(data[i])
            }
          }
          
          this.loading = false;
          
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
      this.getGreeters();
    },
    
  }
</script>
<style lang="scss">
  h1 {
    font-weight:900;
  }
  h2 {
    color: #232323;
  }
  .formf {
    color: white;
    font-size: 18px;
    .label {
      float: left;
    }
  }
  .box2 {
    display: flex;
    .item {
      border: 3px solid black;
      padding: 10px;
      margin: 10px;
    }
  }
</style>
