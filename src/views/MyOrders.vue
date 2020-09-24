<!DOCTYPE html>
<template>
  <div id="order" class="has-footer has-header">
    <div class="pb-5 mb-5"> </div>
    
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">    
    <h2 class="text-center">My Orders</h2>
        
    <div class="text-left p-3 m-3 mx-auto">
      <div class="box1" v-for="o in sortedOrders" :key="o">
        <div class="item">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Created: {{moment(o.created_at).format('MM-DD-YYYY')}}
          <br>
          Status: {{o.status}}
          <div v-if="o.status === 'Completed'">
            Completed at: {{o.completed_at}}
          </div>
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
    name: 'Order',
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
          for(var i=0; i<data.length; i++) {
            if(data[i].auth0_user_id == this.$auth.user.sub) {
              this.orders.push(data[i])
            }
          }
          this.sortedOrders = this.orders.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
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
