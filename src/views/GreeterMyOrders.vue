<!DOCTYPE html>
<template>
  <div id="myorders" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;"> 
      <div class="space pb-5 mt-5"> </div>
         
    <h2 class="text-center">My Orders</h2>
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link>
    
    <div v-if="orders.length<1" class="border m-5 p-4">No orders right now, check back later</div>
    <div class="text-left p-3 m-3 mx-auto">
      <div class="box2" v-for="o in orders" :key="o">
        <div class="item" v-if="o">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Type: {{o.type}}
          <br>
          Created: {{o.created_at.split("T")[0]}}<br>
          Requested: <span v-if="o.date_requested">{{o.date_requested.split("T")[0]}}</span><br>
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
          let url = new URL('https://insong-066b.restdb.io/rest/orders')
          let json = {
            "greeter": this.greeter.user_email
          };
          url.searchParams.set('q', JSON.stringify(json))
          console.log(url)
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.orders = data;
          // for(var i=0; i<data.length; i++) {
//             if(data[i].greeter == this.greeter.email) {
//               if(data[i].status=='In Queue'){
//                 this.orders.push(data[i])
//               }
//             }
//           }
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
      width: 100%;
      padding: 10px;
      margin: 10px;
    }
  }
</style>
