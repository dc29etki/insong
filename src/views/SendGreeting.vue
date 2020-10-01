<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
</head>

  <script
    src="https://www.paypal.com/sdk/js?client-id=Aac4_TjyjB8UrAMqoDjik6EdmYriqFxBT2qMyWxwRUg7ZUyh6EnOZn3abeZsaPfBVdchl8KmYONL3Fxa"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>

<template>
  <div id="greeting-order" class="has-footer has-header">
    <div class="pb-5 mb-5"> </div>
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">   
       
    <h2 v-if="this.type=='birthday'" class="text-center">Happy Birthday</h2>
    <h2 v-if="this.type=='anniversary'" class="text-center">Happy Anniversary</h2>
    <h2 v-if="this.type=='missyou'" class="text-center">I Miss You</h2>
    <h2 v-if="this.type=='thinking'" class="text-center">Thinking of You</h2>
    <h2 v-if="this.type=='love'" class="text-center">I Love You</h2>
    <h2 v-if="this.type=='sorry'" class="text-center">I'm Sorry'</h2>
    
    <h6 id="fill-out">Fill out the form below to send a greeting now!</h6>
    <div id="pay-now">Complete your payment with PayPal to access the order form.
    <div>Available Songs:</div>
    <div class="border songs">
      
      <div v-if="this.type=='birthday'" >
        <div class="list">
          <div class="l-item">Happy Birthday</div>
        </div>
      </div>
      
      <div v-if="this.type=='anniversary'" >
        <div class="list">
          <div class="l-item">Happy Together - The Turtles</div>
          <div class="l-item">Just the Way You Are - Bruno Mars</div>
          <div class="l-item">If I Ain’t Got You - Alecia Keys</div>
          <div class="l-item">I’m Yours - Jason Mraz</div>
          <div class="l-item">How Deep Is Your Love - Bee Gees</div>
          <div class="l-item">I Don’t Want to Miss a Thing - Aerosmith</div>
          <div class="l-item">Thinking Out Loud - Ed Sheeran</div>
        </div>
      </div>
      
      <div v-if="this.type=='missyou'" >
        <div class="list">
          <div class="l-item">Come on Get Higher - Matt Nathanson</div>
          <div class="l-item">Better Together - Jack Johnson</div>
          <div class="l-item">One Call Away - Charlie Puth</div>
          <div class="l-item">Ain’t No Sunshine - Bill Withers</div>
          <div class="l-item">I Don’t Want to Miss a Thing - Aerosmith</div>
          <div class="l-item">Home - Michael Buble</div>
          <div class="l-item">Back to December - Taylor Swift</div>
        </div>
      </div>
      
      <div v-if="this.type=='thinking'" >
        <div class="list">
          <div class="l-item">Chasing Cars - Snow Patrol</div>
          <div class="l-item">I Won’t Give Up - Jason Mraz</div>
          <div class="l-item">Somewhere Over The Rainbow - Judy Garland</div>
          <div class="l-item">Three Little Birds - Bob Marley and The Wailers</div>
          <div class="l-item">Human - Christina Perri</div>
          <div class="l-item">Let It Be - The Beatles</div>
          <div class="l-item">Fight Song - Rachael Platten</div>
        </div>
      </div>
      
      <div v-if="this.type=='sorry'" >
        <div class="list">
          <div class="l-item">I Won’t Give Up - Jason Mraz</div>
          <div class="l-item">Sorry - Justin Bieber</div>
          <div class="l-item">If I Could Turn Back Time - Cher</div>
          <div class="l-item">Please Forgive Me - Bryan Adams</div>
          <div class="l-item">Back to December - Taylor Swift</div>
          <div class="l-item">Hello - Adele</div>
          <div class="l-item">Purple Rain - Prince</div>
        </div>
      </div>
      
      <div v-if="this.type=='love'" >
        <div class="list">
          <div class="l-item">ily (i love you baby) [feat. Emilee] - Surf Mesa</div>
          <div class="l-item">Stand by Me - Ben E. King</div>
          <div class="l-item">Happy Together - The Turtles</div>
          <div class="l-item">Wouldn’t it be Nice - The Beach Boys</div>
          <div class="l-item">Making Memories of Us - Keith Urban</div>
          <div class="l-item">How Deep Is Your Love - Bee Gees</div>
          <div class="l-item">I Don’t Want to Miss a Thing - Aerosmith</div>
        </div>
      </div>
      
    </div>
    <div class="font-weight-bold p-3">Price: $9.95</div>
    </div>
    <div class="formf border py-4 m-1" id="formf" style="margin-bottom: 100px;">
      <div class="page1">
        <form>
          <div v-if="step === 1">

           <h4>Select Your Song</h4>
            
            <div v-if="this.type=='birthday'" class="form-group mx-5">
              <select class="form-control" id="sel1" v-model="formData.song">
                <option>Happy Birthday</option>
              </select>
            </div>
            
            <div v-if="this.type=='anniversary'" class="form-group mx-5">
              <select class="form-control" id="sel1" v-model="formData.song">
                <option>Happy Together - The Turtles</option>
                <option>Just the Way You Are - Bruno Mars</option>
                <option>If I Ain’t Got You - Alecia Keys</option>
                <option>I’m Yours - Jason Mraz</option>
                <option>How Deep Is Your Love - Bee Gees</option>
                <option>I Don’t Want to Miss a Thing - Aerosmith</option>
                <option>Thinking Out Loud - Ed Sheeran</option>
              </select>
            </div>
            
            <div v-if="this.type=='missyou'" class="form-group mx-5">
              <select class="form-control" id="sel1" v-model="formData.song">
                <option>Come on Get Higher - Matt Nathanson</option>
                <option>Better Together - Jack Johnson</option>
                <option>One Call Away - Charlie Puth</option>
                <option>Ain’t No Sunshine - Bill Withers</option>
                <option>I Don’t Want to Miss a Thing - Aerosmith</option>
                <option>Home - Michael Buble</option>
                <option>Back to December - Taylor Swift</option>
              </select>
            </div>
            
            <div v-if="this.type=='thinking'" class="form-group mx-5">
              <select class="form-control" id="sel1" v-model="formData.song">
                <option>Chasing Cars - Snow Patrol</option>
                <option>I Won’t Give Up - Jason Mraz</option>
                <option>Somewhere Over The Rainbow - Judy Garland</option>
                <option>Three Little Birds - Bob Marley and The Wailers</option>
                <option>Human - Christina Perri</option>
                <option>Let It Be - The Beatles</option>
                <option>Fight Song - Rachael Platten</option>
              </select>
            </div>
            
            <div v-if="this.type=='sorry'" class="form-group mx-5">
              <select class="form-control" id="sel1" v-model="formData.song">
                <option>I Won’t Give Up - Jason Mraz</option>
                <option>Sorry - Justin Bieber</option>
                <option>If I Could Turn Back Time - Cher</option>
                <option>Please Forgive Me - Bryan Adams</option>
                <option>Back to December - Taylor Swift</option>
                <option>Hello - Adele</option>
                <option>Purple Rain - Prince</option>
              </select>
            </div>
            
            <div v-if="this.type=='love'" class="form-group mx-5">
              <select class="form-control" id="sel1" v-model="formData.song">
                <option>ily (i love you baby) [feat. Emilee] - Surf Mesa</option>
                <option>Stand by Me - Ben E. King</option>
                <option>Happy Together - The Turtles</option>
                <option>Wouldn’t it be Nice - The Beach Boys</option>
                <option>Making Memories of Us - Keith Urban</option>
                <option>How Deep Is Your Love - Bee Gees</option>
                <option>I Don’t Want to Miss a Thing - Aerosmith</option>
              </select>
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
              <div class="item"></div>
            </div>
    
          </div>
          <div v-if="step === 2">

           <h4 v-if="this.type=='birthday'">When is their birthday?</h4>
           <h4 v-else>When should we send this greeting?</h4>
           <div class="form-group">
             <div class="w-75 mx-auto">
               <input class="form-control" type="date" value="2011-08-19T13:45:00" id="example-datetime-local-input" v-model="formData.date_requested">
             </div>
           </div>
           
           <h4>What is the best time to call?</h4>
           <div class="row p-2 m-0">
             <div class="w-75 mx-auto"><input type="text" placeholder="Example: between 2 and 4 pm" v-model="formData.best_time" class="form-control"></div>
           </div>  
            
              <div class="clearfix"></div>
              
            <div class="form-buttons">  
              <div><button class="btn btn-lg btn-light" @click.prevent="prev()">Back</button></div>
              
              <button class="btn btn-lg btn-light" @click.prevent="next()">Next</button>
            </div>
            <div class="indicators">
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item active"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
            </div>
    
          </div>

          <div v-if="step === 3">
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
                <div class="item active"></div>
                <div class="item"></div>
                <div class="item"></div>
              </div>
              
          </div>
          <div v-if="step === 4">
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
              <div class="item active"></div>
              <div class="item"></div>
            </div>
          </div>

          <div v-if="step === 5">
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
                    Song:
                  </div>
                  <div class="col-8 text-left">
                    {{formData.song}}
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
                    <div class="row">
                      <div class="col-6 text-right">
                        Best Time:
                      </div>
                      <div class="col-6 text-left">
                        {{formData.best_time}}
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
    
    
    <div class="mx-5" id="ppal" style="position: relative; z-index: 1;">
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
      var type = '';
      return {
        step:1,
        orders,
        objectkeys,
        user,
        type,
        apiMessage: "",
        formData: {
          date_requested: '',
          recipient_name: '',
          recipient_phone: '',
          timezone: '',
          message: '',
          song: '',
          anonymous: false
        },
        paypal: {
          sandbox: 'Aac4_TjyjB8UrAMqoDjik6EdmYriqFxBT2qMyWxwRUg7ZUyh6EnOZn3abeZsaPfBVdchl8KmYONL3Fxa',
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
            date_requested: this.formData.date_requested,
            timezone: this.formData.timezone,
            message: this.formData.message,
            anonymous: this.formData.anonymous,
            song: this.formData.song,
            sender: this.$auth.user.name,
            sender_email: this.$auth.user.email,
            auth0_user_id: this.$auth.user.sub,
            created_at: Date.now(),
            type: this.type,
            status: "Posted"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          }).then(this.$router.push({path: "/thank-you"}));

        }
    },
    created() {
      this.getOrders();
      this.type = this.$route.params.type;
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
  .songs {
    margin: 0 25px;
    .list {
      padding: 0 15px;
    }
  }
  
</style>
