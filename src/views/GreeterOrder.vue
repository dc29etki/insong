<!DOCTYPE html>
<template>
  <div id="g-order" class="has-footer has-header">
    
    <div class="home-area m-2 text-center" style="margin-bottom: 100px !important;">  
      <div class="space pb-3 mt-3"> </div>
        
    <h2 class="text-center">Order</h2>
    
    <router-link to="/switchboard" class="btn btn-dark">Back to Switchboard</router-link><br>
        
    <div class="text-left px-3 mb-3 mx-auto">
    <div class="alert alert-primary w-75 mx-auto my-5" v-if="this.loading">Loading...</div>
     <div v-else class="order-info">
       
       <div class="border px-2">
         
         <strong>Recipient:</strong><br>
         Name: {{this.order.recipient_name}}<br>
         Phone: {{this.order.recipient_phone}}<br>
         <span v-if="this.order.date_requested">Date to call: {{this.order.date_requested.split("T")[0]}}<br></span>
         Best Time to call: {{this.order.best_time}}<br>
         Time Zone: {{this.order.timezone}}<br>
         
         <!-- <a target="_blank" :href="'https://telzio.com/dashboard#!dial:+1'+this.order.recipient_phone" class="btn text-white w-100 mx-auto p-0 my-1 font-weight-bold" style="background:#163e5c;"> -->
         <div target="_blank" @click="makeCall()" class="btn text-white w-100 mx-auto p-0 my-1 font-weight-bold" style="background:#163e5c;">
          
           Call With<br><img style="height: 50px; width: auto;" src="https://i.ibb.co/BVRTz8H/telzio.png"/>
         </div>
         Note: Clicking this button will place the call, when the user picks up, your telzio app will ring and connect you.
       </div>
       Created: {{new Date(this.order.created_at).toLocaleString()}}<br>
       <div class=""><strong>Sender:</strong><br>
         Name: {{this.order.sender}}<br>
         Also from: {{this.order.also_from}}<br>
         Anonymous? {{this.order.anonymous}}
       </div>
       <span class="font-weight-bold">Song:</span> {{this.order.song}}<br>
       <div class="border">
        
        <div class="font-weight-bold">Script:</div>
          Hi, is this {{this.order.recipient_name}}?<br>
          — — —<br>
         <div v-if="this.order.recipient_name"> Hi, {{this.order.recipient_name.split(" ")[0]}}! This is {{this.$auth.user.name}} from InSong Greetings calling you on behalf of 
          <span v-if="this.order.anonymous">an anonymous person</span><span v-else>{{this.order.sender}}</span><span v-if="this.order.also_from"> and {{this.order.also_from}}</span> who is the reason you’re receiving this greeting gift.<br>
          <div class="p-2">{{this.order.message}}</div>
          <div class="font-italic text-center p-2">
            <span class="font-weight-bold">[Sing {{this.order.song}}]</span><br>
            <div><p v-html="this.lyrics"></p></div>
            <div v-if="this.order.song=='Happy Birthday'"><p class="font-weight-bold">To: {{this.order.recipient_name.split(" ")[0]}}</p></div>
          </div>
          We hope you enjoyed this InSong greeting! <span v-if="this.order.type=='birthday'">Have a great birthday!</span><span v-else>Have a great day/night!</span>
        </div></div>
        <div class="buttons justify-content-center my-2">
          <div v-if="this.order.calls==0 || !this.order.calls" @click="completeOrder(1, false)" class="btn btn-danger item">Attempted First Call</div>
          <div v-if="this.order.calls==1" @click="completeOrder(2, false)" class="btn btn-danger item">Attempted Second Call</div>
          <div v-if="this.order.calls==2" @click="completeOrder(3, false)" class="btn btn-danger item">Attempted Third Call</div>
          <div v-if="this.order.calls==0 || !this.order.calls" @click="completeOrder(1, true)" class="btn btn-success item">Completed on First Call</div>
          <div v-if="this.order.calls==1" @click="completeOrder(2, true)" class="btn btn-success item">Completed on Second Call</div>
          <div v-if="this.order.calls==2" @click="completeOrder(3, true)" class="btn btn-success item">Completed on Third Call</div>
          <div v-if="this.order.calls>2" @click="completeOrder(99, true)" class="btn btn-success item">Voicemail left</div>
       </div>
     </div>
      
    
    </div>
    
    </div>
    
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment'
import $ from 'jquery'
export default {
    name: 'GreeterMyOrders',
    components: {},
    inject: [],
    data() {      
      var orders = [];
      var order = "";
      var sortedOrders = [];
      var objectkeys = {};
      var user = "";
      var lyrics = "";
      var loading = true;
      return {
        moment,
        orders,
        order,
        sortedOrders,
        objectkeys,
        lyrics,
        user,
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
        makeCall() {
          var phone = "+1" + this.order.recipient_phone;
          var username = this.greeter.telzio_username;
          // fetch("https://api.telzio.com/dial/outbound", {
 //            "method": "POST",
 //            "headers": {
 //              "Content-Type": "application/json",
 //              "Authorization": "Basic cGtfNTFmMzk5ODIwNTAzYmVhNWMzZDEwZTc2NTJlYzpza18xODk5NTA0ODE2YjczNzNkMjE3YmFhNDRlZA=="
 //            },
 //            "body": "{\"From\":\"+19142155033\",\"Aleg\":\"phone\",\"Bleg\":\"username\"}"
 //          })
          axios.post('https://api.telzio.com/dial/outbound', {
              From: '+19142155033',
              Aleg: phone,
              Bleg: username,
            },
            {auth: {
              username: "pk_51f399820503bea5c3d10e7652ec",
              password: "sk_1899504816b7373d217baa44ed"
            }})
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.error(err);
          });
        },
        setLyrics() {
          var song = this.order.song;
          if(song=="ily (i love you baby) [feat. Emilee] - Surf Mesa"){
            this.lyrics = "I love you, baby, and if it's quite alright<br>I need you, baby, to warm these lonely nights<br>I love you, baby<br>Trust in me when I say<br><br>I love you, baby, and if it's quite alright<br>I need you, baby, to warm these lonely nights<br>I love you, baby<br>Trust in me when I say<br><br>I love you, baby...<br>I love you, baby...";
          }
          else if(song=="Stand by Me - Ben E. King") {
            this.lyrics="When the night has come<br>And the land is dark<br>And the moon is the only light we'll see<br>No, I won't be afraid<br>Oh, I won't be afraid<br>Just as long as you stand<br>Stand by me<br><br>So darlin, darlin<br>Stand by me, oh, stand by me<br>Oh, stand, stand by me<br>Stand by me";
          }
          else if(song=="Happy Together - The Turtles") {
            this.lyrics="Imagine me and you, I do<br>I think about you day and night<br>It's only right<br>To think about the girl you love<br>And hold her tight<br>So happy together<br><br>If I should call you up, invest a dime<br>And you say you belong to me<br>And ease my mind<br>Imagine how the world could be<br>So very fine<br>So happy together"
          }
          else if(song=="Wouldn’t it be Nice - The Beach Boys") {
            this.lyrics="Wouldn't it be nice if we were older<br>Then we wouldn't have to wait so long<br>And wouldn't it be nice to live together<br>In the kind of world where we belong<br><br>You know it's gonna make it that much better<br>When we can say goodnight and stay together<br><br>Wouldn't it be nice if we could wake up<br>In the morning when the day is new<br>And after having spent the day together<br>Hold each other close the whole night through<br><br>Happy times together we've been spending<br>I wish that every kiss was never-ending<br>Wouldn't it be nice"
          }
          else if(song=="Making Memories of Us - Keith Urban") {
            this.lyrics="I'm gonna be here for you baby<br>I'll be a man of my word<br>Speak the language in a voice that you have never heard<br>I wanna sleep with you forever<br>And I wanna die in your arms<br>In a cabin by a meadow where the wild bees swarm<br><br>And I'm gonna love you like nobody loves you<br>And I'll earn your trust making memories of us <br>And I'm gonna love you like nobody loves you<br>And I'll earn your trust making memories of us"
          }
          else if(song=="How Deep Is Your Love - Bee Gees") {
            this.lyrics="I believe in you<br>You know the door to my very soul<br>You're the light in my deepest darkest hour<br>You're my savior when I fall<br>And you may not think<br>I care for you<br>When you know down inside<br>That I really do<br>And it's me you need to show<br>How deep is your love<br><br>How deep is your love,<br>How deep is your love<br>I really mean to learn<br>'Cause we're living in a world of fools<br>Breaking us down<br>When they all should let us be<br>We belong to you and me"
          }
          else if(song=="I Don’t Want to Miss a Thing - Aerosmith") {
            this.lyrics="Lying close to you feeling your heart beating<br>And I'm wondering what you're dreaming<br>Wondering if it's me you're seeing<br>Then I kiss your eyes and thank God we're together<br>And I just wanna stay with you<br>In this moment forever, forever and ever<br><br>I don't wanna close my eyes<br>I don't wanna fall asleep<br>'Cause I'd miss you, baby<br>And I don't wanna miss a thing<br><br>'Cause even when I dream of you<br>The sweetest dream would never do<br>I'd still miss you, baby<br>And I don't wanna miss a thing"
          }
          else if(song=="Thinking Out Loud - Ed Sheeran") {
            this.lyrics="When your legs don't work like they used to before<br>And I can't sweep you off of your feet<br>Will your mouth still remember the taste of my love?<br>Will your eyes still smile from your cheeks?<br><br>And, darling, I will be loving you 'til we're 70<br>And, baby, my heart could still fall as hard at 23<br>And I'm thinking 'bout how people fall in love in mysterious ways<br>Maybe just the touch of a hand<br>Well, me&mdash;I fall in love with you every single day<br>And I just wanna tell you I am<br><br>So, honey, now<br>Take me into your loving arms<br>Kiss me under the light of a thousand stars<br>Place your head on my beating heart<br>I'm thinking out loud<br>Maybe we found love right where we are"
          }
          else if(song=="Just the Way You Are - Bruno Mars") {
            this.lyrics="Your lips, your lips<br>I could kiss them all day if you'd let me<br>Your laugh, your laugh<br>You hate but I think it's so sexy<br>You're so beautiful<br>And I tell you everyday<br><br>Oh you know, you know, you know<br>I'd never ask you to change<br>If perfect's what you're searching for<br>Then just stay the same<br>So don't even bother asking if you look okay<br>You know I'll say,<br><br>When I see your face<br>There's not a thing that I would change<br>'Cause you're amazing<br>Just the way you are<br>And when you smile<br>The whole world stops and stares for a while<br>'Cause you're amazing<br>Just the way you are"
          }
          else if(song=="If I Ain’t Got You - Alicia Keys") {
            this.lyrics="Some people live for the fortune<br>Some people live just for the fame<br>Some people live for the power, yeah<br>Some people live just to play the game<br><br>Some people think that the physical things<br>Define what's within<br>And I've been there before<br>But that life's a bore<br>So full of the superficial<br><br>Some people want it all<br>But I don't want nothing at all<br>If it ain't you, baby<br>If I ain't got you, baby<br>Some people want diamond rings<br>Some just want everything<br>But everything means nothing<br>If I ain't got you, yeah"
          }
          else if(song=="I’m Yours - Jason Mraz") {
            this.lyrics="Well, open up your mind and see like me,<br>Open up your plans and damn you're free.<br>Look into your heart and you'll find love, love, love, love.<br>Listen to the music of the moment, people dance and sing, we're just one big family<br>And it's our God-forsaken right to be loved, loved, loved, loved, loved<br><br>So I won't hesitate<br>No more, no more.<br>It cannot wait,<br>I'm sure.<br>There's no need to complicate.<br>Our time is short.<br>This is our fate,<br>I'm yours."
          }
          else if(song=="Come on Get Higher - Matt Nathanson") {
            this.lyrics="I miss the sound of your voice<br>And I miss the rush of your skin<br>And I miss the still of the silence<br>As you breathe out and I breathe in<br><br>If I could walk on water<br>If I could tell you what's next<br>I'd make you believe<br>I'd make you forget<br><br>So come on, get higher, loosen my lips<br>Faith and desire and the swing of your hips<br>Just pull me down hard<br>And drown me in love<br>So come on, get higher, loosen my lips<br>Faith and desire and the swing of your hips<br>Just pull me down hard<br>And drown me in love"
          }
          else if(song=="Better Together - Jack Johnson") {
            this.lyrics="There's no combination of words<br>I could put on the back of a postcard<br>No song that I could sing<br>But I can try for your heart<br>Our dreams,<br>And they are made out of real things<br>Like a shoebox of photographs<br>With sepia-toned loving<br><br>Love is the answer.<br>At least for most of the questions in my heart.<br>Like: &quot;Why are we here?&quot;, &quot;And where do we go?&quot;,<br>&quot;And how come it's so hard?&quot;.<br>It's not always easy,<br>And sometimes life can be deceiving<br>I'll tell you one thing:<br>It's always better when we're together<br><br>Mmm, it's always better when we're together<br>Yeah, we'll look at them stars when we're together<br>Well, it's always better when we're together<br>Yeah, it's always better when we're together"
          }
          else if(song=="One Call Away - Charlie Puth") {
            this.lyrics="I'm only one call away<br>I'll be there to save the day<br>Superman got nothing on me<br>I'm only one call away<br><br>Call me, baby, if you need a friend<br>I just wanna give you love<br>C'mon, c'mon, c'mon<br>Reaching out to you, so take a chance<br><br>No matter where you go<br>Know you're not alone<br><br>I'm only one call away<br>I'll be there to save the day<br>Superman got nothing on me<br>I'm only one call away"
          }
          else if(song=="Ain’t No Sunshine - Bill Withers") {
            this.lyrics="Ain't no sunshine when you&rsquo;re gone<br>It's not warm when you&rsquo;re away<br>Ain't no sunshine when you&rsquo;re gone<br>And you&rsquo;re always gone too long<br>Anytime you go away<br><br>Wonder this time where you&rsquo;re gone<br>Wonder if you&rsquo;re gone to stay<br>Ain't no sunshine when you&rsquo;re gone<br>And this house just ain't no home<br>Anytime you go away<br><br>And I know, I know, I know, I know<br>I know, I know, I know, I know, I know<br>I know, I know, I know, I know, I know<br>I know, I know, I know, I know, I know<br>I know, I know, I know, I know, I know<br>I know, I know<br>Hey, I oughta leave young thing alone<br>But ain't no sunshine when you&rsquo;re gone"
          }
          else if(song=="Home - Michael Buble") {
            this.lyrics="Another summer day<br>Has come and gone away<br>In Paris and Rome<br>But I wanna go home<br><br>May be surrounded by<br>A million people I<br>Still feel all alone<br>Just wanna go home<br>Oh, I miss you, you know<br><br>And I've been keeping all the letters that I wrote to you<br>Each one a line or two<br>&quot;I'm fine baby, how are you?&quot;<br>Well, I would send them but I know that it's just not enough<br>My words were cold and flat<br>And you deserve more than that<br><br>Another airplane<br>Another sunny place<br>I'm lucky, I know<br>But I wanna go home<br>I've got to go home<br><br>Let me go home<br>I'm just too far from where you are<br>I wanna come home"
          }
          else if(song=="Back to December - Taylor Swift") {
            this.lyrics="These days I haven't been sleeping,<br>Staying up, playing back myself leavin'.<br>When your birthday passed and I didn't call.<br><br>And I think about summer, all the beautiful times,<br>I watched you laughing from the passenger side.<br>And realized I loved you in the fall.<br><br>And then the cold came, the dark days when fear crept into my mind<br>You gave me all your love and all I gave you was &quot;Goodbye&quot;.<br><br>So this is me swallowing my pride,<br>Standing in front of you, saying, &quot;I'm sorry for that night.&quot;<br>And I go back to December all the time.<br><br>It turns out freedom ain't nothing but missing you.<br>Wishing I'd realized what I had when you were mine.<br>I'd go back to December, turn around and change my own mind.<br>I go back to December all the time."
          }
          else if(song=="Chasing Cars - Snow Patrol") {
            this.lyrics="We don't need<br>Anything<br>Or anyone<br><br>If I lay here<br>If I just lay here<br>Would you lie with me and just forget the world?<br><br>Those three words<br>Are said too much<br>They're not enough<br><br>If I lay here<br>If I just lay here<br>Would you lie with me and just forget the world?"
          }
          else if(song=="I Won’t Give Up - Jason Mraz") {
            this.lyrics="When I look into your eyes<br>It's like watching the night sky<br>Or a beautiful sunrise<br>Well, there's so much they hold<br>And just like them old stars<br>I see that you've come so far<br>To be right where you are<br>How old is your soul?<br><br>Well, I won't give up on us<br>Even if the skies get rough<br>I'm giving you all my love<br>I'm still looking up <br><br>'Cause even the stars they burn<br>Some even fall to the earth<br>We've got a lot to learn<br>God knows we're worth it<br>No, I won't give up"
          }
          else if(song=="Somewhere Over The Rainbow - Judy Garland") {
            this.lyrics="Somewhere over the rainbow way up high<br>There's a land that I heard of once in a lullaby<br>Somewhere over the rainbow skies are blue<br>And the dreams that you dare to dream really do come true<br><br>Someday I'll wish upon a star<br>And wake up where the clouds are far<br>Behind me<br>Where troubles melt like lemon drops<br>Away above the chimney tops<br>That's where you'll find me<br><br>Somewhere over the rainbow bluebirds fly<br>Birds fly over the rainbow<br>Why then, oh, why can't I?"
          }
          else if(song=="Three Little Birds - Bob Marley and The Wailers") {
            this.lyrics="Don't worry about a thing<br>'Cause every little thing gonna be all right<br>Singin': &quot;Don't worry about a thing<br>'Cause every little thing gonna be all right!&quot;<br><br>Rise up this mornin'<br>Smile with the risin&rsquo; sun<br>Three little birds<br>Pitch by my doorstep<br>Singin' sweet songs<br>Of melodies pure and true<br>Sayin', (&quot;This is my message to you&quot;)<br><br>Singin': &quot;Don't worry 'bout a thing<br>'Cause every little thing gonna be all right&quot;<br>Singin': &quot;Don't worry (don't worry) 'bout a thing<br>'Cause every little thing gonna be all right!"
          }
          else if(song=="Human - Christina Perri") {
            this.lyrics="I can turn it on<br>Be a good machine<br>I can hold the weight of worlds<br>If that's what you need<br>Be your everything<br><br>I can do it<br>I can do it<br>I'll get through it<br><br>But I'm only human<br>And I bleed when I fall down<br>I'm only human<br>And I crash and I break down<br>Your words in my head, knives in my heart<br>You build me up and then I fall apart<br>'Cause I'm only human"
          }
          else if(song=="Let It Be - The Beatles") {
            this.lyrics="When I find myself in times of trouble<br>Mother Mary comes to me<br>Speaking words of wisdom<br>Let it be<br><br>Let it be, let it be, let it be, let it be<br>Whisper words of wisdom<br>Let it be <br><br>For though they may be parted there is<br>Still a chance that they will see<br>There will be an answer<br>Let it be<br><br>Let it be, let it be, let it be, let it be<br>Yeah, there will be an answer<br>Let it be"
          }
          else if(song=="Fight Song - Rachael Platten") {
            this.lyrics="Like a small boat<br>On the ocean<br>Sending big waves<br>Into motion<br>Like how a single word<br>Can make a heart open<br>I might only have one match<br>But I can make an explosion<br><br>And all those things I didn't say<br>Wrecking balls inside my brain<br>I will scream them loud tonight<br>Can you hear my voice this time?<br><br>This is my fight song<br>Take back my life song<br>Prove I'm alright song<br>My power's turned on<br>Starting right now I'll be strong<br>I'll play my fight song<br>And I don't really care if nobody else believes<br>'Cause I've still got a lot of fight left in me"
          }
          else if(song=="Skyscraper - Demi Lovato") {
            this.lyrics="Skies are crying, I am watching<br>Catching tear drops in my hands<br>Only silence as it's ending<br>Like we never had a chance<br>Do you have to make me feel like<br>There's nothing left of me?<br><br>You can take everything I have<br>You can break everything I am<br>Like I'm made of glass<br>Like I'm made of paper<br>Go on and try to tear me down<br>I will be rising from the ground<br>Like a skyscraper<br>Like a skyscraper<br>I will be rising from the ground<br>Like a skyscraper<br>Like a skyscraper"
          }
          else if(song=="Beautiful - Christina Aguilera") {
            this.lyrics="To all your friends you're delirious<br>So consumed in all your doom<br>Trying hard to fill the emptiness<br>The pieces gone, left the puzzle undone<br>Is that the way it is?<br><br>You are beautiful no matter what they say<br>Words can't bring you down...oh no<br>You are beautiful in every single way<br>Yes, words can't bring you down, oh, no<br>So don't you bring me down today <br><br>You are beautiful no matter what they say<br>Words can't bring you down...oh no<br>You are beautiful in every single way<br>Yes, words can't bring you down, oh, no<br>So don't you bring me down today"
          }
          else if(song=="Life of the Party - Shawn Mendes") {
            this.lyrics="I love it when you just don't care<br>I love it when you dance like there's nobody there<br>So when it gets hard, don't be afraid<br>We don't care what them people say<br>I love it when you don't take no<br>I love it when you do what you want cause you just said so<br>Let them all go home, we out late<br>We don't care what them people say<br><br>We don't have to be ordinary<br>Make your best mistakes<br>'Cause we don't have the time to be sorry<br>So baby be the life of the party<br>I'm telling you to take your shot it might be scary<br>Hearts are gonna break<br>'Cause we don't have the time to be sorry<br>So baby be the life of the party"
          }
          else if(song=="Stronger (What Doesn’t Kill You) - Kelly Clarkson") {
            this.lyrics="You think you got the best of me<br>Think you've had the last laugh<br>Bet you think that everything good is gone<br>Think you left me broken down<br>Think that I'd come running back<br>Baby, you don't know me <br>'&#1057;ause you're dead wrong<br><br>What doesn't kill you makes you stronger<br>Stand a little taller<br>Doesn't mean I'm lonely when I'm alone<br>What doesn't kill you makes a fighter<br>Footsteps even lighter<br>Doesn't mean I'm over cause you're gone<br><br>What doesn't kill you makes you stronger, stronger<br>Just me, myself and I<br>What doesn't kill you makes you stronger<br>Stand a little taller<br>Doesn't mean I'm lonely when I'm alone"
          }
          else if(song=="Sorry - Justin Bieber") {
            this.lyrics="You gotta go and get angry at all of my honesty<br>You know I try but I don't do too well with apologies<br>I hope I don't run out of time. Could someone call a referee?<br>'Cause I just need one more shot at forgiveness<br><br>I know you know that I made those mistakes maybe once or twice<br>And by once or twice I mean maybe a couple of hundred times<br>So let me, oh, let me redeem, oh, redeem, oh, myself tonight<br>'Cause I just need one more shot at second chances<br><br>Yeah<br>Is it too late now to say sorry?<br>'Cause I'm missing more than just your body, oh<br>Is it too late now to say sorry?<br>Yeah, I know-oh-oh, that I let you down<br>Is it too late to say I'm sorry now?<br><br>I'm sorry, yeah<br>Sorry yeah<br>Sorry<br>Yeah, I know that I let you down<br>Is it too late to say I'm sorry now?"
          }
          else if(song=="If I Could Turn Back Time - Cher") {
            this.lyrics="I don't know why I did the things I did<br>I don't know why I said the things I said<br>Pride's like a knife it can cut deep inside<br>Words are like weapons they wound sometimes<br><br>I didn't really mean to hurt you<br>I didn't wanna see you go<br>I know I made you cry, but baby<br><br>If I could turn back time<br>If I could find a way<br>I'd take back those words that've hurt you<br>And you'd stay<br>If I could reach the stars<br>I'd give them all to you<br>Then you'd love me, love me<br>Like you used to do"
          }
          else if(song=="Please Forgive Me - Bryan Adams") {
            this.lyrics="Still feels like our first night together<br>Feels like the first kiss, it's gettin' better, baby<br>No one can better this...<br>Still holdin' on, you're still the one.<br>First time our eyes met, same feelin' I get<br>Only feels much stronger, wanna love you longer<br>You still turn the fire on...<br><br>So if you're feelin' lonely&mdash;don't<br>You're the only one I ever want.<br>I only wanna make it good<br>So if I love you a little more than I should...<br><br>Please forgive me<br>I know not what I do.<br>Please forgive me<br>I can't stop lovin' you<br>Don't deny me.<br>This pain I'm going through...<br>Please forgive me if I need you like I do.<br>Please believe me.<br>Every word I say is true...<br>Please forgive me<br>I can't stop loving you"
          }
          else if(song=="Back to December - Taylor Swift") {
            this.lyrics="These days I haven't been sleeping,<br>Staying up, playing back myself leavin'.<br>When your birthday passed and I didn't call.<br><br>And I think about summer, all the beautiful times,<br>I watched you laughing from the passenger side.<br>And realized I loved you in the fall.<br><br>And then the cold came, the dark days when fear crept into my mind<br>You gave me all your love and all I gave you was &quot;Goodbye&quot;.<br><br>So this is me swallowing my pride,<br>Standing in front of you, saying, &quot;I'm sorry for that night.&quot;<br>And I go back to December all the time.<br><br>It turns out freedom ain't nothing but missing you.<br>Wishing I'd realized what I had when you were mine.<br>I'd go back to December, turn around and change my own mind.<br>I go back to December all the time."
          }
          else if(song=="Hello - Adele") {
            this.lyrics="Hello, how are you?<br>It's so typical of me to talk about myself, I'm sorry<br>I hope that you're well<br>Did you ever make it out of that town<br>Where nothing ever happened?<br><br>It's no secret that the both of us<br>Are running out of time<br><br>So hello from the other side (other side)<br>I must have called a thousand times (thousand times)<br>To tell you I'm sorry for everything that I've done<br>But when I call you never seem to be home<br>Hello from the outside (outside)<br>At least I can say that I've tried (I've tried)<br>To tell you I'm sorry for breaking your heart<br>But it don't matter, it clearly doesn't tear you apart<br>Anymore"
          }
          else if(song=="Purple Rain - Prince") {
            this.lyrics="I never meant to cause you any sorrow<br>I never meant to cause you any pain<br>I only wanted one time to see you laughing<br>I only want to see you laughing in the purple rain<br><br>Purple rain, purple rain<br>Purple rain, purple rain<br>Purple rain, purple rain <br><br>I never meant to cause you any sorrow<br>I never meant to cause you any pain<br>I only wanted one time to see you laughing<br>I only want to see you laughing in the purple rain<br><br>Purple rain, purple rain<br>Purple rain, purple rain<br>Purple rain, purple rain"
          }
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
          else {this.getOrders();}
        },   
        postOrder(){
          var url = "https://insong-066b.restdb.io/rest/";
          const token = this.$auth.getTokenSilently();
          console.log(token);
          axios.get(url)
        },
        async addOrder(id) {
          console.log(id);
          const token = await this.$auth.getTokenSilently();
          axios.put("https://insong-066b.restdb.io/rest/orders/"+id,
          {
            status: "In Queue",
            greeter: this.greeter.email
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          }).then(this.$router.push({path: "/switchboard"}));
        },
        
        async completeOrder(calls, completed) {
          var status = '';
          if(completed) {
            status = "Completed"
          }
          if(!completed) {
            status = "Attempted"
          }
          var id = this.$route.params.id;
          const token = await this.$auth.getTokenSilently();
          axios.put("https://insong-066b.restdb.io/rest/orders/"+id,
          {
            status: status,
            calls: calls,
            completed_at: Date.now()
          },
          {
            headers: {
              Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
            }
          })
          var greeterID = this.greeter._id;
          var birthdayamount = 0.00;
          var amount = 0.00;
          if(this.order.type=='Birthday'){
            birthdayamount = 9.95
          }
          else {amount = 14.95}
          if(completed){
            axios.put("https://insong-066b.restdb.io/rest/greeters/"+this.greeter._id,
            {
              orders_completed: this.greeter.orders_completed + 1,
              money_earned: this.greeter.money_earned + birthdayamount + amount,
              money_owed: this.greeter.money_earned + birthdayamount + amount,
              money_owed_birthday: this.money_owed_birthday + birthdayamount,
              money_owed_other:  this.money_owed_other + amount,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
              }
            }).then(this.$router.push({path: "/switchboard"}));
          }else {this.$router.push({path: "/switchboard"})}
        },
        
        async getOrders() {
          const token = await this.$auth.getTokenSilently();
          let url = new URL('https://insong-066b.restdb.io/rest/orders')
          let json = {
            "_id": this.$route.params.id 
          };
          url.searchParams.set('q', JSON.stringify(json))
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.order = data[0];
          this.setLyrics();
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
    mounted() { 
      this.getGreeters();
    }
  }
</script>
<style lang="scss">
  #g-order {
    height: auto;
    background: white;
    overflow: scroll !important;
    color: #232323;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: none;
    .item {
      width: auto;
      margin: 0 10px;
    }
  }
  .order-info {
    border: 3px solid white;
    padding: 10px;
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
