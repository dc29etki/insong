<!DOCTYPE html>
<template>
  <div id="g-order" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">  
      <div class="pb-5 mb-5"> </div>
        
    <h2 class="text-center">Order</h2>
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link>
    <div class="text-left p-3 m-3 mx-auto">
     <div class="order-info">
       <div class="border p-2"><strong>Recipient:</strong><br>
         Name: {{this.order.recipient_name}}<br>
         Phone: {{this.order.recipient_phone}}<br>
         Date to call: {{new Date(this.order.date_requested).toLocaleString()}}<br>
         Best Time to call: {{this.order.best_time}}<br>
         Time Zone: {{this.order.timezone}}
       </div>
       Created: {{new Date(this.order.created_at).toLocaleString()}}<br>
       Song: {{this.order.song}}<br>
       Message: {{this.order.message}}
       <div class=""><strong>Sender:</strong><br>
         Name: {{this.order.sender}}<br>
         Also from: {{this.order.also_from}}<br>
         Anonymous? {{this.order.anonymous}}
       </div>
       
     </div>
     <div class="buttons">
       <div v-if="this.order.calls==0 || !this.order.calls" @click="completeOrder(1, false)" class="btn btn-danger item">Attempted First Call</div>
       <div v-if="this.order.calls==1" @click="completeOrder(2, false)" class="btn btn-danger item">Attempted Second Call</div>
       <div v-if="this.order.calls==2" @click="completeOrder(3, false)" class="btn btn-danger item">Attempted Third Call</div>
       <div v-if="this.order.calls==0 || !this.order.calls" @click="completeOrder(1, true)" class="btn btn-success item">Completed on First Call</div>
       <div v-if="this.order.calls==1" @click="completeOrder(2, true)" class="btn btn-success item">Completed on Second Call</div>
       <div v-if="this.order.calls==2" @click="completeOrder(3, true)" class="btn btn-success item">Completed on Third Call</div>
       <div v-if="this.order.calls>2" @click="completeOrder(99, true)" class="btn btn-success item">Voicemail left</div>
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
      var order = "";
      var sortedOrders = [];
      var objectkeys = {};
      var user = "";
      return {
        moment,
        orders,
        order,
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
            "user_email": this.$auth.user_email
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
        
        async completeOrder(calls, completed) {
          var status = '';
          if(completed) {
            status = "Completed"
          }
          if(!completed) {
            status = "Attempted"
          }
          var id = this.$route.params.id;
          const token = await this.$auth.getTokenSilently();
          axios.put("https://insong-066b.restdb.io/rest/orders/"+id,
          {
            status: status,
            calls: calls,
            completed_at: Date.now()
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          })
          var greeterID = this.greeter._id;
          var amount = 0;
          if(this.order.type=='Birthday'){
            amount = 9.95
          }
          else if(this.order.type=='Cover (partial)'){
            amount = 13.95
          }
          else if(this.order.type=='Happy (full)'){
            amount = 19.95
          }
          else {amount = 9.95}
          axios.put("https://insong-066b.restdb.io/rest/greeters/"+this.greeter._id,
          {
            orders_completed: this.greeter.orders_completed + 1,
            money_earned: this.greeter.money_earned + amount,
            money_owed: this.greeter.money_earned + amount
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
            "_id": this.$route.params.id 
          };
          url.searchParams.set('q', JSON.stringify(json))
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.order = data[0]
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
  #g-order {
    height: auto;
    background: white;
    overflow: scroll !important;
    color: #232323;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: none;
    .item {
      width: auto;
      margin: 0 10px;
    }
  }
  .order-info {
    border: 3px solid white;
    padding: 10px;
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
