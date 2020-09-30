<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
</head>

  <script
    src="https://www.paypal.com/sdk/js?client-id=Aac4_TjyjB8UrAMqoDjik6EdmYriqFxBT2qMyWxwRUg7ZUyh6EnOZn3abeZsaPfBVdchl8KmYONL3Fxa"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>

<template>
  <div id="greeting" class="has-footer has-header">
    <div class="pb-5 mb-5"> </div>
    
    <h2 class="text-center">All Greetings</h2>
    <h5 class="text-center">Click to Choose</h5>
    <div class="greetings pb-3">
      <router-link to="/birthday"><img src=".././assets/greeting-icons/birthday.png"/></router-link>
      <router-link to="/cover-partial"><img src=".././assets/greeting-icons/anniversary.png"/></router-link>
      <router-link to="/cover-full"><img src=".././assets/greeting-icons/miss.png"/></router-link>
      <router-link to="/birthday"><img src=".././assets/greeting-icons/thinking.png"/></router-link>
      <router-link to="/cover-partial"><img src=".././assets/greeting-icons/love.png"/></router-link>
      <router-link to="/cover-full"><img src=".././assets/greeting-icons/sorry.png"/></router-link>
    </div>
  </div>
</template>s

<script>
import axios from 'axios';
import PayPal from 'vue-paypal-checkout'
export default {
    name: 'Order',
    components: {},
    inject: [],
    data() {      
      var orders = {};
      var objectkeys = {};
      var user = "";
      return {
        orders,
        objectkeys,
        user,
        apiMessage: "",
        formData: {
          recipient_name: '',
          recipient_phone: '',
        },
        paypal: {
          sandbox: 'Aac4_TjyjB8UrAMqoDjik6EdmYriqFxBT2qMyWxwRUg7ZUyh6EnOZn3abeZsaPfBVdchl8KmYONL3Fxa',
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
        hello(){
          console.log("hi");
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
          this.apiMessage = data;
        },
        async postOrders() {
          const token = await this.$auth.getTokenSilently();
          axios.post("https://insong-066b.restdb.io/rest/orders",
          {
            recipient_name: this.formData.recipient_name,
            recipient_phone: this.formData.recipient_phone,
            song: 'Happy Birthday',
            sender: this.$auth.user.name,
            auth0_user_id: this.$auth.user.sub,
            created_at: Date.now(),
            status: "Posted"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          }).then(this.$router.push({path: "/my-orders"}));

        }
    },
    created() {
      this.getOrders();
    },
    mounted () {
      
    }
    
  }
</script>
<style lang="scss">
  #greeting {
    height: auto;
    background: white;
    overflow: scroll;
    color: white;
  }
  h1 {
    font-weight:900;
  }
  h2, h5 {
    color: #232323 !important;
  }
  #fill-out {
    display: none;
  }
  .formf {
    display: none;
    color: white;
    font-size: 18px;
    .label {
      float: left;
    }
  }
  .greetings {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: white;
    margin-bottom: 100px !important;
    img {
      height: 22vh;
    }
    .item {
      border: 3px solid #333;
      border-radius: 50%;
      height: 150px;
      width: 150px;
      margin: 15px 25px;
      text-align: center;
      display: flex; /* or inline-flex */
      align-items: center; 
      justify-content: center;
    }
  }
</style>
