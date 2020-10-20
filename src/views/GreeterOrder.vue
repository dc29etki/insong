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
         Date to call: {{this.order.date_requested.split("T")[0]}}<br>
         Best Time to call: {{this.order.best_time}}<br>
         Time Zone: {{this.order.timezone}}
       </div>
       Created: {{new Date(this.order.created_at).toLocaleString()}}<br>
       <div class=""><strong>Sender:</strong><br>
         Name: {{this.order.sender}}<br>
         Also from: {{this.order.also_from}}<br>
         Anonymous? {{this.order.anonymous}}
       </div>
       <div class="border">
        <span class="font-weight-bold">Song:</span> {{this.order.song}}<br>
        <div class="font-weight-bold">Script:</div>
          Hi, is this {{this.order.recipient_name}}?<br>
          — — —<br>
          Hi, {{this.order.recipient_name.split(" ")[0]}}! This is {{this.$auth.user.name}} from InSong Greetings calling you on behalf of 
          <span v-if="this.order.anonymous">an anonymous person</span><span v-else>{{this.order.sender}}</span><span v-if="this.order.also_from"> and {{this.order.also_from}}</span> who is the reason you’re receiving this greeting gift.<br>
          <div class="font-italic">{{this.order.message}}</div>
          <div class="font-weight-bold text-center">
            [Sing <span class="font-italic">{{this.order.song}}</span>]
          </div>
          We hope you enjoyed this InSong greeting! <span v-if="this.order.type=='birthday'">Have a great birthday!</span><span v-else>Have a great day/night!</span>
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
      var lyrics = "";
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
          var birthdayamount = 0.00;
          var amount = 0.00;
          if(this.order.type=='Birthday'){
            birthdayamount = 9.95
          }
          else {amount = 14.95}
          if(completed){
            axios.put("https://insong-066b.restdb.io/rest/greeters/"+this.greeter._id,
            {
              orders_completed: this.greeter.orders_completed + 1,
              money_earned: this.greeter.money_earned + birthdayamount + amount,
              money_owed: this.greeter.money_earned + birthdayamount + amount,
              money_owed_birthday: this.money_owed_birthday + birthdayamount,
              money_owed_other:  this.money_owed_other + amount,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
              }
            }).then(this.$router.push({path: "/switchboard"}));
          }else {this.$router.push({path: "/switchboard"})}
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
