<!DOCTYPE html>
<template>
  <div id="corder" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;"> 
      <div class="space pb-3 mt-3"> </div>
         
    <h2 class="text-center">My Completed Orders</h2>
    
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link>
    
    <div class="pt-3">
      {{this.greeter.orders_completed}} orders completed for a total of ${{this.greeter.money_earned.toFixed(2)}}
    </div>
    <div class="text-left p-3 mx-3 mx-auto">
      <div class="box2" v-for="o in orders" :key="o">
        <div class="item">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Type: {{o.type}}
          <br>
          Created: {{o.created_at.split("T")[0]}}
          <br>
          Completed: {{o.completed_at.split("T")[0]}}
          <br>
          Price: <span v-if="o.type=='Birthday'">$9.95</span>
          <span v-if="o.type=='Cover (partial)'">$13.95</span>
          <span v-if="o.type=='Cover (full)'">$19.95</span>
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
    name: 'CompletedOrders',
    components: {},
    inject: [],
    data() {      
      var orders = [];
      var sortedOrders = [];
      var objectkeys = {};
      var user = "";
      var greeter = "";
      return {
        moment,
        orders,
        sortedOrders,
        objectkeys,
        user,
        greeter,
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
            "greeter": this.greeter.user_email,
            "status": "Completed"
          };
          url.searchParams.set('q', JSON.stringify(json))
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.orders = data;
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
    mounted() {
      this.getGreeters();
    }
    
  }
</script>
<style lang="scss">
  #corder {
    height: auto;
    background: white;
    overflow: scroll !important;
    color: #232323;
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
  .box3 {
    display: flex;
    .item {
      border: 3px solid #333;
      width: 100%;
      padding: 10px;
      margin: 10px;
    }
  }
</style>
