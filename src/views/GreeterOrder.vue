<!DOCTYPE html>
<template>
  <div id="order" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">  
      <div class="pb-5 mb-5"> </div>
        
    <h2 class="text-center">Order</h2>
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link>
    <div class="text-left p-3 m-3 mx-auto">
     <div class="order-info">
       Created: {{moment(this.order.created_at).format('MM-DD-YYYY')}}<br>
       Song: {{this.order.song}}<br>
       Type: {{this.order.type}}<br>
       <div class="border p-2">Recipient:<br>
         Name: {{this.order.recipient_name}}<br>
         Phone: {{this.order.recipient_phone}}
       </div>
     </div>
     <div class="buttons">
       <div @click="completeOrder(1)" class="btn btn-dark">Completed on First Call</div>
       <div @click="completeOrder(2)" class="btn btn-dark">Completed on Second Call</div>
       <div @click="completeOrder(3)" class="btn btn-dark">Completed on Third Call</div>
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
        
        async completeOrder(calls) {
          var id = this.$route.params.id;
          const token = await this.$auth.getTokenSilently();
          axios.put("https://insong-066b.restdb.io/rest/orders/"+id,
          {
            status: "Completed",
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
          axios.put("https://insong-066b.restdb.io/rest/greeters/"+this.greeter._id,
          {
            orders_completed: this.greeter.orders_completed + 1,
            money_earned: this.greeter.money_earned + amount
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
    created() { 
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
  .buttons {
    display: flex;
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
