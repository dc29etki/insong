<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
</head>

  <script
    src="https://www.paypal.com/sdk/js?client-id=AXFB1opqCo3013I9MKgZGbnmaGiZmwY2sQxrF19lYhZkOs_NogqFJoV4Zjil6T144yiuTFivx4JYuBjK"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>

<template>
  <div id="greeting-order" class="has-footer has-header noselect">
    <div class="space pb-3 mt-3"> </div>
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">    
    <h2 class="text-center">Happy Birthday</h2>
    <h6 id="fill-out">Fill out the form below to send a greeting now!</h6>
    <h6 id="pay-now">Complete your payment with PayPal to access the order form.
      <div class="p-3">Price: $9.95</div></h6>
    <div class="formf border py-4 m-1" id="formf" style="margin-bottom: 100px;">
      <div class="page1">
        <form>
          <div v-if="step === 1">

            <h4>When is their birthday?</h4>
           <div class="form-group">
             <div class="w-75 mx-auto">
               <input class="form-control" type="date" value="2011-08-19T13:45:00" id="example-datetime-local-input" v-model="formData.date_requested">
             </div>
           </div>
            
              <div class="clearfix"></div>
              
            <div class="form-buttons">  
              <button class="btn btn-lg btn-light" @click.prevent="next()">Next</button>
            </div>
            <div class="indicators">
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
            </div>
    
          </div>

          <div v-if="step === 2">
            <h4>Who is this for?</h4>
            <div class="row p-2 m-0">
              <div class="col-12"><input type="text" placeholder="Recipient Name" v-model="formData.recipient_name" class="span3 w-100 form-control"></div>
              <br>
            </div>
            <div class="row p-2 m-0">
              <div class="col-12"><input type="text" placeholder="Recipient Phone" v-model="formData.recipient_phone" class="span3 w-100 form-control"></div>
              <br>
            </div>
            <div class="time-zone w-50 mx-auto">
              <h5>Time Zone</h5>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="eastern" v-model="formData.timezone" checked>
                <label class="form-check-label" for="exampleRadios1">
                  Eastern Time
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="central" v-model="formData.timezone">
                <label class="form-check-label" for="exampleRadios2">
                  Central Time
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="mountain" v-model="formData.timezone">
                <label class="form-check-label" for="exampleRadios3">
                  Mountain Time
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="pacific" v-model="formData.timezone">
                <label class="form-check-label" for="exampleRadios3">
                  Pacific Time
                </label>
              </div>
            </div>

              <div class="clearfix"></div>
                            
              <div class="form-buttons">  
                <div><button class="btn btn-lg btn-light" @click.prevent="prev()">Back</button></div>
                <div><button class="btn btn-lg btn-light" @click.prevent="next()">Next</button></div>
              </div>
              <div class="indicators">
                <div class="item active"></div>
                <div class="item active"></div>
                <div class="item active"></div>
                <div class="item"></div>
                <div class="item"></div>
              </div>

          </div>
          <div v-if="step === 3">
            <h5>What would you like to say?</h5>
            <p class="mx-3" style="font-size: 12px;">Type a personalizied message or keep it blank and leave it up to us. Your greeter will read this to your recipient prior to performing the greeting song.</p>
            <div class="form-group">
              <textarea v-model="formData.message" class="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
              <div class="clearfix"></div>

            <div class="form-buttons">  
              <div><button class="btn btn-lg btn-light" @click.prevent="prev()">Back</button></div>
              <div><button class="btn btn-lg btn-light" @click.prevent="next()">Next</button></div>
            </div>
            <div class="indicators">
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item"></div>
            </div>
          </div>

          <div v-if="step === 4">
              <h5>Review your order</h5>
              <div>
                <div class="row">
                  <div class="col-4 text-right">
                    From:
                  </div>
                  <div class="col-8 text-left">
                    {{this.$auth.user.name}}
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-4 text-right">
                  </div>
                  <div class="col-8 text-left">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="formData.anonymous">
                      <label class="form-check-label" for="exampleCheck1">Send Anonymously</label>
                    </div>
                  </div>
                </div>
                
                
                <div class="row">
                  <div class="col-4 text-right">
                    To:
                  </div>
                  <div class="col-8 text-left">
                    <div class="border">
                    <div class="row">
                      <div class="col-6 text-right">
                        Name:
                      </div>
                      <div class="col-6 text-left">
                        {{formData.recipient_name}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 text-right">
                        Phone:
                      </div>
                      <div class="col-6 text-left">
                        {{formData.recipient_phone}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 text-right">
                        Time Zone:
                      </div>
                      <div class="col-6 text-left">
                        {{formData.timezone}}
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-4 text-right">
                    Date:
                  </div>
                  <div class="col-8 text-left">
                    {{formData.date_requested}}
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-4 text-right">
                    Message:
                  </div>
                  <div class="col-8 text-left">
                    {{formData.message}}
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-4 text-right">
                    Anonymous:
                  </div>
                  <div class="col-8 text-left">
                    <div v-if="formData.anonymous">Yes</div>
                    <div v-if="!formData.anonymous">No</div>
                  </div>
                </div>
                
              </div>

              <div class="clearfix"></div>

            <div class="form-buttons">  
              <div><button class="btn btn-lg btn-light" @click.prevent="prev()">Back</button></div>
              <div><button class="btn btn-lg btn-light btn-submit" @click="postOrders()">Submit</button></div>
            </div>
            <div class="indicators">
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item active"></div>
            </div>
    
          </div>
          </form>
        </div>
        <!-- <form>
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
        </form> -->
    </div>    
    
    
    <div class="mx-5" id="ppal">
      <div id="paypal-button-container"></div>
      <div class="indicators">
        <div class="item active"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
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
        step:1,
        orders,
        objectkeys,
        user,
        apiMessage: "",
        formData: {
          date_requested: '',
          recipient_name: '',
          recipient_phone: '',
          timezone: '',
          message: '',
          anonymous: false
        },
        paypal: {
          sandbox: 'AXFB1opqCo3013I9MKgZGbnmaGiZmwY2sQxrF19lYhZkOs_NogqFJoV4Zjil6T144yiuTFivx4JYuBjK',
        }
      }
    },
      computed: {

      },
    methods: {
      prev() {
            this.step--;
          },
          next() {
            this.step++;
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
          
        },  
        postOrder(){
          var url = "https://insong-066b.restdb.io/rest/";
          const token = this.$auth.getTokenSilently();
          
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
            type: "Birthday",
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
                  value: '9.95'
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
                document.getElementById("ppal").style.display = "none";
            });
          }
        }).render('#paypal-button-container'); 
    }
    
  }
</script>
<style lang="scss">
  #greeting-order {
    height: auto;
    background: white;
    overflow: scroll;
    color: #232323;
  }
  h1 {
    font-weight:900;
    color: #232323;
  }
  h2, h3, h4 {
    color: #232323;
  }
  #fill-out {
    display: none;
  }
  .formf {
    display: none;
    color: #232323 !important;
    font-size: 18px;
    .label {
      float: left;
    }
  }
  .indicators {
    padding: 5px;
    margin: 10px;
    display: flex;
    justify-content: center;
    .item {
      padding: 10px;
      margin: 10px;
      background: #999;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      &.active {
        background: #FF9A00;
      }
    }
  }
  .form-buttons {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    button {
      width: 17vw;
      margin: 0 10px;
      background: #FF9A00;
      height: 17vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: white;  
    }
    .btn-submit {
      background: darkgreen;
    }
  }
</style>
