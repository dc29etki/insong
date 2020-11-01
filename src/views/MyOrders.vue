<!DOCTYPE html>
<template>
  <div id="myorders" class="has-footer has-header">
    <div class="space pb-3 mt-3"> </div>
    
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">    
    <h2 class="text-center">My Greetings</h2>
    <div v-if="this.loading" class="alert alert-primary w-75 mx-auto my-5">Loading greetings...</div>
    <div v-if="!this.loading && !this.orders_exist" class="alert alert-danger w-75 mx-auto my-5">No Greetings Yet</div>
    
    <div v-if="this.orders_exist" class="text-left p-3 m-3 mx-auto">
      <div class="box2" v-for="o in sortedOrders" :key="o">
        <div v-if="o.status=='Completed'" class="item completed">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Created: {{o.created_at.split("T")[0]}}
          <br>
          Status: {{o.status}}
          <div v-if="o.status === 'Completed' && o.completed_at">
            Completed at: {{o.completed_at.split("T")[0]}}
          </div>
        </div>
        <div v-if="o.status=='In Queue'" class="item queue">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Created: {{o.created_at.split("T")[0]}}
          <br>
          Status: {{o.status}}
          <div v-if="o.status === 'Completed' && o.completed_at">
            Completed at: {{o.completed_at.split("T")[0]}}
          </div>
        </div>
        <div v-if="o.status=='Posted'" class="item posted">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Created: {{o.created_at.split("T")[0]}}
          <br>
          Status: {{o.status}}
          <div v-if="o.status === 'Completed' && o.completed_at">
            Completed at: {{o.completed_at.split("T")[0]}}
          </div>
        </div>
        <div v-if="o.status=='Attempted'" class="item attempted">
          Sent to: {{o.recipient_name}}
          <br>
          Song: {{o.song}}
          <br>
          Created: {{o.created_at.split("T")[0]}}
          <br>
          Status: {{o.status}}
          <div v-if="o.status === 'Completed' && o.completed_at">
            Completed at: {{o.completed_at.split("T")[0]}}
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
      var loading = true;
      var orders_exist = false;
      return {
        moment,
        orders,
        sortedOrders,
        objectkeys,
        user,
        orders_exist,
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
        postOrder(){
          var url = "https://insong-066b.restdb.io/rest/";
          const token = this.$auth.getTokenSilently();
          console.log(token);
          axios.get(url)
          },
        async getOrders() {
          const token = await this.$auth.getTokenSilently();
          let url = new URL('https://insong-066b.restdb.io/rest/orders')
          let json = {
            "auth0_user_id": this.$auth.user.sub
          };
          url.searchParams.set('q', JSON.stringify(json))
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          });
          this.orders = data;
          this.sortedOrders = this.orders.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          this.loading = false;
          if(this.sortedOrders.length > 0) {
            this.orders_exist = true;
          }
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
  #myorders {
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
  .box2 {
    display: flex;
    .item {
      width: 100%;
      padding: 10px;
      margin: 10px;
      &.completed {
        border: 5px solid darkgreen;
        background-color:rgba(10, 83, 1, 0.2);
        color: #232323;
      }
      &.posted {
        border: 5px solid #FF9A00;
        background-color:rgba(255, 144, 0, 0.2);
        color: #232323;
      }
      &.queue {
        border: 5px solid darkblue;
        background-color:rgba(7, 0, 120, 0.2);
        color: #232323;
      }
      &.attempted {
        border: 5px solid darkred;
        background-color:rgba(255, 0, 0, 0.2);
        color: #232323;
      }
    }
  }
</style>
