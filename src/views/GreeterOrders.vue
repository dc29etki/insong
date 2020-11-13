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
    <div class="alert alert-warning w-75 mx-auto mt-4" v-if="count>=2">You already have 2 greetings in your <router-link to="/greeter-myorders">queue.</router-link> Complete those before claiming new greetings.</div>
    <div class="alert alert-primary w-75 mx-auto my-5" v-if="loading">Loading...</div>
    <div v-if="!loading && sortedOrders.length<1" class="border m-5 p-4">No orders right now, check back later</div>
      
      <div v-if="sortedOrders.length>0" class="text-left p-3 m-3 mx-auto">
        Todays Orders:
        <div class="box2" v-for="o in sortedOrders" :key="o">
          
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
            
            Time Requested: {{o.best_time}}, {{o.timezone}}<br>
            
            <div v-if="count<2" class="btn btn-primary" @click="addOrder(o._id)">Add to Queue</div>
            <div v-else class="btn btn-primary disabled">Add to Queue</div>
            
          
          </div>
        </div>
        <hr>
      </div>
        
    <div v-if="futureOrders.length>0" class="text-left p-3 m-3 mx-auto">
      Future Orders:
      <div class="box2" v-for="o in futureOrders" :key="o">
          <div class="item">
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
            Time Requested: {{o.best_time}}, {{o.timezone}}<br>
          </div>
          <hr>
        </div>
      </div>
    </div>
        
      <div v-if="missedOrders.length>0" class="text-left p-3 m-3 mx-auto">
       <h4 style="color:red;">Missed Orders:</h4>
        <div class="box2" v-for="o in missedOrders" :key="o">
          <div v-if="o.date_requested.split('T')[0] < moment().format('YYYY-MM-DD')">
            
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
            Time Requested: {{o.best_time}}, {{o.timezone}}<br>
            <div class="btn btn-primary" @click="addOrder(o._id)">Add to Queue</div>
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
      var futureOrders = [];
      var missedOrders = [];
      var objectkeys = {};
      var greeter = "";
      var user = "";
      var loading = true;
      var count = 0;
      return {
        moment,
        orders,
        sortedOrders,
        objectkeys,
        user,
        greeter,
        count,
        loading,
        futureOrders,
        missedOrders,
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
          else {
            this.getGreeterOrders();
            this.getOrders();
          }
        },     
        postOrder(){
          var url = "https://insong-066b.restdb.io/rest/";
          const token = this.$auth.getTokenSilently();
          
          axios.get(url)
        },
        async addOrder(id) {
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
          
          for (var i=0; i<data.length; i++) {
            if (data[i].date_requested.split('T')[0] == moment().format('YYYY-MM-DD')){
              this.orders.push(data[i])
            }
            else if (data[i].date_requested.split('T')[0] > moment().format('YYYY-MM-DD')){
              this.futureOrders.push(data[i])
            }
            else if (data[i].date_requested.split('T')[0] < moment().format('YYYY-MM-DD')){
              this.missedOrders.push(data[i])
            }
          }
                    
          this.sortedOrders = this.orders.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          this.loading = false;
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
      padding: 10px;
      margin: 10px;
    }
  }
</style>
