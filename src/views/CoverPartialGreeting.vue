<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
</head>

  <script
    src="https://www.paypal.com/sdk/js?client-id=Aac4_TjyjB8UrAMqoDjik6EdmYriqFxBT2qMyWxwRUg7ZUyh6EnOZn3abeZsaPfBVdchl8KmYONL3Fxa"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>

<template>
  <div id="order" class="has-footer has-header">
    <div class="pb-5 mb-5"> </div>
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">    
    <h2 class="text-center">Cover Song (Partial)</h2>
    <h6 id="fill-out">Fill out the form below to send a greeting now!</h6>
    <h6 id="pay-now">Complete your payment with PayPal to access the order form.
      <div class="p-3">Price: $13.95</div></h6>
    <div class="formf border py-4 m-1" id="formf" style="margin-bottom: 100px;">
        <form>
        <div class="row p-2 m-0">
          <div class="col-12"><input type="text" placeholder="Recipient Name" v-model="formData.recipient_name" class="span3 w-100"></div>
          <br>
        </div>
        <div class="row p-2 m-0">
          <div class="col-12"><input type="text" placeholder="Recipient Phone" v-model="formData.recipient_phone" class="span3 w-100"></div>
          <br>
        </div>
        
        <div class="row pt-2">
          <div class="col-12"><input type="submit" value="Submit" @click="postOrders()" class="btn btn-lg btn-light pull-right"></div>
        </div>
          <div class="clearfix"></div>
        </form>
    </div>    
    
    
    <div class="mx-5">
      <div id="paypal-button-container"></div>
    </div>
    
    
    </div>
    
  </div>
</template>

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
            type: "Cover (partial)",
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
      paypal.Buttons({
          createOrder: function(data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '13.95'
                }
              }]
            });
          },
          onApprove: function(data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture()
              .then(function(details) {
                document.getElementById("formf").style.display = "block";
                document.getElementById("fill-out").style.display = "block";
                document.getElementById("pay-now").style.display = "none";
                document.getElementById("paypal-button-container").style.display = "none";
            });
          }
        }).render('#paypal-button-container');
    }
    
  }
</script>
<style lang="scss">
  #order {
    height: auto;
    background: #14213d;
    overflow: scroll;
    color: white;
  }
  h1 {
    font-weight:900;
  }
  h2 {
    color: #fca311;
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
</style>
