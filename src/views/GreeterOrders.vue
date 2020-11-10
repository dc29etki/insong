<!DOCTYPE html>
<template>
  <div id="orders" class="has-footer has-header noselect">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">   
      <div class="space pb-3 mt-3"> </div>
       
    <h2 class="text-center">Available Orders</h2>
    <h6>Select order to add to your queue.</h6>
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link>
    <!-- orders:<div class="box2" v-for="o in orders" :key="o">
      order{{o}}
    </div> -->
    <div class="alert alert-primary w-75 mx-auto my-5" v-if="loading">Loading...</div>
    <div v-if="!loading && sortedOrders.length<1" class="border m-5 p-4">No orders right now, check back later</div>

    <div v-if="sortedOrders.length>0">
      
      <div v-if="sortedOrders" class="text-left p-3 m-3 mx-auto">
        <div class="box2" v-for="o in sortedOrders" :key="o">
          Todays Orders:
          <div v-if="o.date_requested.split('T')[0] == moment().format('YYYY-MM-DD')" class="item">
            Sent to: {{o.recipient_name}}
            <br>
            Song: {{o.song}}
            <br>
            Type: {{o.type}}
            <br>
            Price: <span v-if="o.type=='Birthday'">$2.00</span><span v-else>$3.50</span>
            <br>
            <span v-if="o.created_at">
              Created: {{o.created_at.split("T")[0]}}<br>
            </span>
            
            <span v-if="o.date_requested">
              Date Requested: {{o.date_requested.split("T")[0]}}<br>
            </span>
            
            Time Requested: {{o.best_time}}, {{o.timezone}} Time<br>
            
            <div class="btn btn-primary" @click="addOrder(o._id)">Add to Queue</div>
          </div>
        </div>
        <hr>
        <div class="box2" v-for="o in sortedOrders" :key="o">
          <!-- Future Orders:
          <div v-if="o.date_requested.split('T')[0] > moment().format('YYYY-MM-DD')" class="item">
            Sent to: {{o.recipient_name}}
            <br>
            Song: {{o.song}}
            <br>
            Type: {{o.type}}
            <br>
            <span v-if="o.created_at">
              Created: {{o.created_at.split("T")[0]}}<br>
            </span>
            <span v-if="o.date_requested">
              Date Requested: {{o.date_requested.split("T")[0]}}<br>
            </span>
            <div class="btn btn-primary" @click="addOrder(o._id)">Add to Queue</div>
          </div> -->
          <div v-if="o.date_requested.split('T')[0] < moment().format('YYYY-MM-DD')">
            <hr>
            <h4 style="color:red;">Missed Order:</h4>
            <div style="border:5px solid red; padding: 10px;">
            Sent to: {{o.recipient_name}}{{o}}hi
            <br>
            Song: {{o.song}}
            <br>
            Type: {{o.type}}
            <br>
            <span v-if="o.created_at">
              Created: {{o.created_at.split("T")[0]}}<br>
            </span>
            <span v-if="o.date_requested">
              Date Requested: {{o.date_requested.split("T")[0]}}<br>{{moment().format('YYYY-MM-DD')}}
            </span>
            <div class="btn btn-primary" @click="addOrder(o._id)">Add to Queue</div>
            </div>
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
    name: 'GreeterOrders',
    components: {},
    inject: [],
    data() {      
      var orders = [];
      var sortedOrders = [];
      var objectkeys = {};
      var greeter = "";
      var user = "";
      var loading = true;
      return {
        moment,
        orders,
        sortedOrders,
        objectkeys,
        user,
        greeter,
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
          console.log(this.greeter);
          const token = await this.$auth.getTokenSilently();
          axios.patch("https://insong-066b.restdb.io/rest/orders/"+id,
          {
            status: "In Queue",
            greeter: this.greeter.user_email
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
            "status": "Posted",
          };
          url.searchParams.set('q', JSON.stringify(json))
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.orders = data;
          
          this.sortedOrders = this.orders.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          this.loading = false;
          console.log(this.sortedOrders)
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
      this.getOrders();
    }
    
  }
</script>
<style lang="scss">
  #orders {
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
    flex-direction: column;
    .item {
      border: 3px solid #232323;
      width: 100%;
      padding: 10px;
      margin: 10px;
    }
  }
</style>
