<template>
  <div id="order" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">    
    <h2 class="text-center">Send a Greeting</h2>
    <h6>Fill out the form below to send a greeting now!</h6>
        
    <div class="text-left p-3 m-3 w-75 mx-auto border">
      <h5>My Orders:</h5>
      <div v-for="o in  orders" :key="o">
        <hr><div>Sent to: {{o.recipient}}<br>Song: {{o.song}}<br>Date: {{o.created_at}}</div>
      </div>
            
    </div>
    <div class="formf border py-4 m-1" style="margin-bottom: 100px;">
        <form>
        <div class="row p-2">
          <div class="col-4"><label>Recipient</label></div>
          <div class="col-6"><input type="text" v-model="formData.recipient" class="span3"></div>
          <br>
        </div>
        <div class="row p-2">
          <div class="col-4"><label>Song</label></div>
          <div class="col-6"><input type="type" v-model="formData.song" class="span3"></div>
          <br>
        </div>
        <div class="row p-2">
          <div class="col-4"><label>Input</label></div>
          <div class="col-6"><input type="type" class="span3"></div>
          <br>
        </div>
        <div class="row p-2">
          <div class="col-4"><label>Input</label></div>
          <div class="col-6"><input type="type" class="span3"></div>
          <br>
        </div>
        <div class="row p-2">
          <div class="col-4"><label>Input</label></div>
          <div class="col-6"><input type="type" class="span3"></div>
          <br>
        </div>
        <div class="row p-2">
          <div class="col-4"><label>Input</label></div>
          <div class="col-6"><input type="type" class="span3"></div>
          <br>
        </div>
        <div class="row pt-2">
          <div class="col-12"><input type="submit" value="Submit" @click="postOrders()" class="btn btn-lg btn-light pull-right"></div>
        </div>
          <div class="clearfix"></div>
        </form>
    </div>    
    
    
    </div>
    
  </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Order',
    components: {},
    inject: [],
    data() {      
      var orders = [];
      var objectkeys = {};
      var user = "";
      return {
        orders,
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
</style>
