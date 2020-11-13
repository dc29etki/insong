<!DOCTYPE html>
<template>
  <div id="switchboard" class="has-footer has-header noselect">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">
      <div class="space pb-3 mt-3"> </div>
              
    <h2 class="text-center">Welcome greeter!</h2>
        
    <div class="border" v-if="this.greeter">
      {{this.greeter.orders_completed}} orders completed for a total of ${{this.greeter.money_earned.toFixed(2)}}
      <br>Money Earned Birthday: ${{this.greeter.money_owed_birthday}}
      <br>Money Earned Other: ${{this.greeter.money_owed_other}}
    </div>
      <div class="buttons3">
        <div><router-link to="/greeter-myorders" class="btn btn-lg btn-dark">My orders ({{this.count}})</router-link></div>
        <!-- <div v-else><router-link to="/greeter-myorders" class="btn btn-lg btn-dark font-weight-bold" style="background: #FF9A00 !important;">My orders ({{this.count}})</router-link></div> -->
        <div><router-link to="/greeter-orders" class="btn btn-lg btn-dark">Available orders</router-link></div>
        <div><router-link to="/completed-orders" class="btn btn-lg btn-dark">Completed orders</router-link></div>
      </div>
    </div>        
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment'
export default {
    name: 'Switchboard',
    components: {},
    inject: [],
    data() {      
      var orders = [];
      var sortedOrders = [];
      var objectkeys = {};
      var user = "";
      var greeter = "";
      var count = 0;
      return {
        moment,
        orders,
        sortedOrders,
        objectkeys,
        user,
        count,
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
        makeCall() {
          var username = this.greeter.telzio_username;
          this.$confirm("Call "+"?").then(() => {
            axios.post('https://api.telzio.com/dial/user', {
                Username: username,
                Destination: '+15186496876',
              },
              {
              auth: {
                username: "pk_51f399820503bea5c3d10e7652ec",
                password: "sk_1899504816b7373d217baa44ed"
              }})
            .then(response => {
              console.log(response);
            })
            .catch(err => {
              console.error(err);
            })
          });
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
          else {
            this.getGreeterOrders();
          }
        },  
        async getGreeterOrders() {
          const token = await this.$auth.getTokenSilently();
          let url = new URL('https://insong-066b.restdb.io/rest/orders')
          let json = {
            "greeter": this.greeter.user_email,
          };
          url.searchParams.set('q', JSON.stringify(json))
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          var count = 0;
          for(var i=0; i<data.length; i++) {
            if(data[i].status!="Completed"){
              count ++;
            }
          }
          
          this.count = count;
                  
        },
        postOrder(){
          var url = "https://insong-066b.restdb.io/rest/";
          const token = this.$auth.getTokenSilently();
          axios.get(url)
        },
        async addOrder(id) {
          const token = await this.$auth.getTokenSilently();
          axios.put("https://insong-066b.restdb.io/rest/orders/"+id,
          {
            status: "In Queue",
            greeter: this.$auth.user
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
      this.getGreeters();
      
    }
    
  }
</script>
<style lang="scss">
  #switchboard {
    height: auto;
    background: white;
    overflow: scroll !important;
    color: #232323;
  }
  .buttons3 {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    .btn {
      margin: 10px;
      padding: 10px;
      width: 75%;
    }
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
