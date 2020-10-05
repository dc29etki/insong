<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
 </head>

  <script
    src="https://www.paypal.com/sdk/js?client-id=Aac4_TjyjB8UrAMqoDjik6EdmYriqFxBT2qMyWxwRUg7ZUyh6EnOZn3abeZsaPfBVdchl8KmYONL3Fxa"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>

<template>
  <div id="greeting" class="has-footer has-header">
    <div class="pb-5 mb-5"> </div>
    
    <h3 class="text-center">Click to Choose</h3>
    <div class="outside">
    <div class="greetings my-auto">
      <div id="demo" class="carousel slide" data-ride="carousel">

        <!-- Indicators -->
        <ul class="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" class="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
          <li data-target="#demo" data-slide-to="3"></li>
          <li data-target="#demo" data-slide-to="4"></li>
          <li data-target="#demo" data-slide-to="5"></li>
        </ul>
  
        <!-- The slideshow -->
        <div class="carousel-inner text-center mb-3">
          <div class="carousel-item active">
            <div class="b-item"><router-link to="/send-greeting/birthday"><img src=".././assets/greeting-icons/birthday.png"/></router-link></div>
          </div>
          <div class="carousel-item">
            <div class="b-item"><router-link to="/send-greeting/anniversary"><img src=".././assets/greeting-icons/anniversary.png"/></router-link></div>
          </div>
          <div class="carousel-item">
            <div class="b-item"><router-link to="/send-greeting/missyou"><img src=".././assets/greeting-icons/miss.png"/></router-link></div>
          </div>
          <div class="carousel-item">
            <div class="b-item"><router-link to="/send-greeting/thinking"><img src=".././assets/greeting-icons/thinking.png"/></router-link></div>
          </div>
          <div class="carousel-item">
            <div class="b-item"><router-link to="/send-greeting/love"><img src=".././assets/greeting-icons/love.png"/></router-link></div>
          </div>
          <div class="carousel-item">
            <div class="b-item"><router-link to="/send-greeting/sorry"><img src=".././assets/greeting-icons/sorry.png"/></router-link></div>
          </div>
        </div>
  
        <!-- Left and right controls -->
        <a class="carousel-control-prev" href="#demo" data-slide="prev">
         <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import PayPal from 'vue-paypal-checkout'
import moment from 'moment'
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
        moment,
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
  .greetings1 {
    width: 75vw;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: none;
    overflow: scroll;
    background: white;
    margin-bottom: 100px !important;
    
    .item {
      border: 3px solid #333;
      border-radius: 50%;
      height: 85px;
      width: 85px;
      margin: 15px 25px;
      text-align: center;
      display: flex; /* or inline-flex */
      align-items: center; 
      justify-content: center;
    }
  }
  .carousel-indicators li {
    background-color: #aaa;
    &.active {
      background-color: #FF9A00;
    }
  }
  .carousel-inner {
    width: 100vw;
  }
  .greetings {
    display: flex;
    width: 100vw;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  
  .b-item {
    width: 100%;
    img {
      width: 75%;
    }
  }
  
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    height: 50px;
    width: 40px;
    outline: black;
    background-size: 100%, 100%;
    border-radius: 50%;
    background-image: none;
  }

  .carousel-control-prev-icon {
   background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%232323' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
  }

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%232323' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
  }
  .outside{
    display: flex;
    height: 60vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
</style>
