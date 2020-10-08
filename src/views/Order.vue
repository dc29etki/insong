<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>

  <script
    src="https://www.paypal.com/sdk/js?client-id=Aac4_TjyjB8UrAMqoDjik6EdmYriqFxBT2qMyWxwRUg7ZUyh6EnOZn3abeZsaPfBVdchl8KmYONL3Fxa"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<template>
  <div id="greeting" class="has-footer has-header">
    <div class="pb-5 mb-5"> </div>
    
    <h3 class="text-center">Click to Choose</h3>
    <div class="outside">
    <div id="car-view" v-if="this.view=='car'" class="greetings my-auto">
      <div id="carousel1" class="carousel slide" data-ride="carousel">

        <!-- Indicators -->
        <ul class="carousel-indicators">
          <li data-target="#carousel1" data-slide-to="0" class="active"></li>
          <li data-target="#carousel1" data-slide-to="1"></li>
          <li data-target="#carousel1" data-slide-to="2"></li>
          <li data-target="#carousel1" data-slide-to="3"></li>
          <li data-target="#carousel1" data-slide-to="4"></li>
          <li data-target="#carousel1" data-slide-to="5"></li>
        </ul>
  
        <!-- The slideshow -->
        <div class="carousel-inner text-center mb-3">
          <div class="carousel-item active" data-interval="2000">
            <div class="b-item"><router-link to="/send-greeting/birthday"><img src=".././assets/greeting-icons/birthday.png"/></router-link></div>
          </div>
          <div class="carousel-item" data-interval="2000">
            <div class="b-item"><router-link to="/send-greeting/anniversary"><img src=".././assets/greeting-icons/anniversary.png"/></router-link></div>
          </div>
          <div class="carousel-item" data-interval="2000">
            <div class="b-item"><router-link to="/send-greeting/missyou"><img src=".././assets/greeting-icons/miss.png"/></router-link></div>
          </div>
          <div class="carousel-item" data-interval="2000">
            <div class="b-item"><router-link to="/send-greeting/thinking"><img src=".././assets/greeting-icons/thinking.png"/></router-link></div>
          </div>
          <div class="carousel-item" data-interval="2000">
            <div class="b-item"><router-link to="/send-greeting/love"><img src=".././assets/greeting-icons/love.png"/></router-link></div>
          </div>
          <div class="carousel-item" data-interval="2000">
            <div class="b-item"><router-link to="/send-greeting/sorry"><img src=".././assets/greeting-icons/sorry.png"/></router-link></div>
          </div>
        </div>
  
        <!-- Left and right controls -->
        <a class="carousel-control-prev" href="#carousel1" data-slide="prev">
         <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#carousel1" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
    
    <div id="grid-view" v-if="this.view=='grid'">
      <div class="item"><router-link to="/send-greeting/birthday"><img src=".././assets/greeting-icons/birthday.png"/></router-link></div>
      <div class="item"><router-link to="/send-greeting/anniversary"><img src=".././assets/greeting-icons/anniversary.png"/></router-link></div>
      <div class="item"><router-link to="/send-greeting/missyou"><img src=".././assets/greeting-icons/miss.png"/></router-link></div>
      <div class="item"><router-link to="/send-greeting/thinking"><img src=".././assets/greeting-icons/thinking.png"/></router-link></div>
      <div class="item"><router-link to="/send-greeting/love"><img src=".././assets/greeting-icons/love.png"/></router-link></div>
      <div class="item"><router-link to="/send-greeting/sorry"><img src=".././assets/greeting-icons/sorry.png"/></router-link></div>
    </div>
    
    <div class="switch-button">
      <label class="toggle-label">
      <input type="checkbox">
      <span @click="switchview()" class="back">
        <span class="toggle"></span>
        <span class="label on">CAROUSEL</span>
        <span class="label off">GRID</span>
      </span>
      </label>
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
      var view = 'car';
      return {
        orders,
        objectkeys,
        user,
        moment,
        view,
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
        switchview() {
          if(this.view=='grid'){this.view='car'}
          else if(this.view=='car'){this.view='grid'}
        },
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
      margin: 5vh;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #grid-view {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin: 25px;
    img {
      height: 18vh;
      width: 18vh;
      margin: 5px;
    }
  }
  
  .toggle-label {
    position: relative;
    width: 300px;
    height: 30px;
    margin-top: 10px;
  }
  .toggle-label input[type=checkbox] { 
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
  }
  .toggle-label input[type=checkbox]+.back {
      position: absolute;
      width: 100%;
      height: 30px;
      left: 0;
      top: 0;
      border-radius: 50px;
      border: 4px solid #FF9A00;
      transition: background 150ms linear;
  }
  .toggle-label input[type=checkbox]:checked+.back {
      border: 4px solid #FF9A00;
      cursor: pointer;
  }

  .toggle-label input[type=checkbox]+.back .toggle {
    display: block;
    position: absolute;
    content: ' ';
    background: #000;
    width: 50%; 
    height: 100%;
    transition: margin 150ms linear;
    border: 0px solid #808080;
    border-radius: 50px;
  }
  .toggle-label input[type=checkbox]:checked+.back .toggle {
    margin-left: 150px;
  }
  .toggle-label .label {
    display: block;
    position: absolute;
    width: 50%;
    color: white;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
  }
  .toggle-label .label.on { left: 0px; }
  .toggle-label .label.off { right: 0px; }

  .toggle-label input[type=checkbox]:checked+.back .label.on {
    color: #FF9A00;
  }
  .toggle-label input[type=checkbox]+.back .label.off {
    color: #FF9A00;
      cursor: pointer;
  }
  .toggle-label input[type=checkbox]:checked+.back .label.off {
    color: white;
  }
  .toggle {
    background: #FF9A00 !important;
    z-index: 0;
    //border: 1px solid black !important;
  }

</style>
