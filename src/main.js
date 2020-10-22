import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from "./store";
import VueAxios from './plugins/axios'
import { authGuard } from "./auth/authGuard";

Vue.use(VueAxios)


Vue.use(VueRouter);

import Home from './views/Home.vue';
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import navbar from "./views/Navbar";
import order from "./views/Order";
import Profile from "./views/Profile.vue";
import more from "./views/more.vue";
import MyOrders from "./views/MyOrders.vue";
import checkout from "./views/checkout.vue";
import birthday from "./views/BirthdayGreeting.vue";
import coverpartial from "./views/CoverPartialGreeting.vue";
import coverfull from "./views/CoverFullGreeting.vue";
import greeterorders from "./views/GreeterOrders.vue";
import switchboard from "./views/Switchboard.vue";
import greetermyorders from "./views/GreeterMyOrders.vue";
import greeterorder from "./views/GreeterOrder.vue";
import completedorders from "./views/CompletedOrders.vue";
import sendgreeting from "./views/SendGreeting.vue";
import thankyou from "./views/ThankYou.vue";
import help from "./views/Help.vue";
import greetingscenter from "./views/GreetingsCenter.vue";





import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome)
library.add(faNewspaper)
library.add(faStore)
library.add(faBars)
library.add(faUserCircle)
library.add(faList)
library.add(faMicrophone)
library.add(faQuestion)
library.add(faHandshake)
library.add(faCircle)


// Import the plugin here
import { Auth0Plugin } from "./auth";

import { domain, clientId, audience } from "../auth_config.json";

// Install the authentication plugin here
Vue.use(Auth0Plugin, { 
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});


Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
            path: '/',
            name: 'home',
            component: Home 
    },
    {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/order',
            name: 'Order',
            component: order,
            beforeEnter: authGuard
        },
        {
            path: "/more",
            name: "more",
            component: more,
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            beforeEnter: authGuard
        },
        {
            path: "/my-orders",
            name: "myorders",
            component: MyOrders,
            beforeEnter: authGuard
        },
        {
            path: "/checkout",
            name: "checkout",
            component: checkout,
        },
        {
            path: "/birthday",
            name: "birthday",
            component: birthday,
        },
        {
            path: "/cover-partial",
            name: "coverpartial",
            component: coverpartial,
        },
        {
            path: "/cover-full",
            name: "coverfull",
            component: coverfull,
        },
        {
            path: "/greeter-orders",
            name: "GreeterOrders",
            component: greeterorders,
        },
        {
            path: "/switchboard",
            name: "Switchboard",
            component: switchboard,
            beforeEnter: authGuard
        },
        {
            path: "/greeter-myorders",
            name: "GreeterMyOrders",
            component: greetermyorders,
        },
        {
            path: '/greeter-order/:id',
            name: "GreeterOrder",
            component: greeterorder,
        },
        {
            path: '/completed-orders',
            name: "CompletedOrders",
            component: completedorders,
        },
        {
            path: '/send-greeting/:type',
            name: "SendGreeting",
            component: sendgreeting,
        },
        {
            path: '/thank-you',
            name: "ThankYou",
            component: thankyou,
        },
        {
            path: '/help',
            name: "Help",
            component: help,
        },
        {
            path: '/greetings-center',
            name: "Greetings Center",
            component: greetingscenter,
        }
  ]
});


var Auth0Cordova =  require('@auth0/cordova');
const vueApp = new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    main() {
      var app = new App();
      function intentHandler(url) {
        Auth0Cordova.onRedirectUri(url);
      }
      window.handleOpenURL = intentHandler;
      app.run('#app');
    }
  }
}).$mount('#app');



document.addEventListener('deviceready', vueApp.main);

function getBySelector(arg) {
  return document.querySelector(arg);
}

function getById(id) {
  return document.getElementById(id);
}

function getRedirectUrl() {
  var returnTo = "com.insong.davidetkin" + '://dev-wz6g3vmy.us.auth0.com/cordova/' + "com.insong.davidetkin" + '/callback';
  var url = 'https://dev-wz6g3vmy.us.auth0.com/v2/logout?client_id=f9DYf30EJs4VnJFv6qmPznbuE78FLjti&returnTo=' + returnTo;
  return url;
}



// // src/App.js
//
// var Auth0 = require('auth0-js');
//
// function getBySelector(arg) {
//   return document.querySelector(arg);
// }
//
// function getById(id) {
//   return document.getElementById(id);
// }
//
// function getRedirectUrl() {
//   var returnTo = env.PACKAGE_ID + '://dev-wz6g3vmy.us.auth0.com/cordova/' + env.PACKAGE_ID + '/callback';
//   var url = 'https://dev-wz6g3vmy.us.auth0.com/v2/logout?client_id=f9DYf30EJs4VnJFv6qmPznbuE78FLjti&returnTo=' + returnTo;
//   return url;
// }
//
// function openUrl(url) {
//   SafariViewController.isAvailable(function (available) {
//     if (available) {
//       SafariViewController.show({
//             url: url
//           },
//           function(result) {
//             if (result.event === 'loaded') {
//               SafariViewController.hide();
//             }
//           },
//           function(msg) {
//             console.log("KO: " + JSON.stringify(msg));
//           })
//     } else {
//       window.open(url, '_system');
//     }
//   })
// }
//
// function App1() {
//   this.auth0 = new Auth0.Authentication({
//     domain: 'dev-wz6g3vmy.us.auth0.com',
//     clientID: 'f9DYf30EJs4VnJFv6qmPznbuE78FLjti'
//   });
//   this.login = this.login.bind(this);
//   this.logout = this.logout.bind(this);
// }
//
// App.prototype.state = {
//   authenticated: false,
//   accessToken: false,
//   currentRoute: '/',
//   routes: {
//     '/': {
//       id: 'loading',
//       onMount: function(page) {
//         if (this.state.authenticated === true) {
//           return this.redirectTo('/home');
//         }
//         return this.redirectTo('/login');
//       }
//     },
//     '/login': {
//       id: 'login',
//       onMount: function(page) {
//         if (this.state.authenticated === true) {
//           return this.redirectTo('/home');
//         }
//         var loginButton = page.querySelector('.btn-login');
//         loginButton.addEventListener('click', this.login);
//       }
//     },
//     '/home': {
//       id: 'profile',
//       onMount: function(page) {
//         if (this.state.authenticated === false) {
//           return this.redirectTo('/login');
//         }
//         var logoutButton = page.querySelector('.btn-logout');
//         var avatar = page.querySelector('#avatar');
//         var profileCodeContainer = page.querySelector('.profile-json');
//         logoutButton.addEventListener('click', this.logout);
//         this.loadProfile(function(err, profile) {
//           if (err) {
//             profileCodeContainer.textContent = 'Error ' + err.message;
//           }
//           profileCodeContainer.textContent = JSON.stringify(profile, null, 4);
//           avatar.src = profile.picture;
//         });
//       }
//     }
//   }
// };
//
// App.prototype.run = function(id) {
//   this.container = getBySelector(id);
//   this.resumeApp();
// };
//
// App.prototype.loadProfile = function(cb) {
//   this.auth0.userInfo(this.state.accessToken, cb);
// };
//
// App.prototype.login = function(e) {
//   e.target.disabled = true;
//
//   var client = new Auth0Cordova({
//     domain: 'dev-wz6g3vmy.us.auth0.com',
//     clientId: 'f9DYf30EJs4VnJFv6qmPznbuE78FLjti',
//     packageIdentifier: 'YOUR_PACKAGE_ID' // found in config.xml
//   });
//
//   var options = {
//     scope: 'openid profile',
//     audience: 'https://dev-wz6g3vmy.us.auth0.com/userinfo'
//   };
//   var self = this;
//   client.authorize(options, function(err, authResult) {
//     if (err) {
//       console.log(err);
//       return (e.target.disabled = false);
//     }
//     localStorage.setItem('access_token', authResult.accessToken);
//     self.resumeApp();
//   });
// };
//
// App.prototype.logout = function(e) {
//   localStorage.removeItem('access_token');
//   var url = getRedirectUrl();
//   openUrl(url);
//   this.resumeApp();
// };
//
// App.prototype.redirectTo = function(route) {
//   if (!this.state.routes[route]) {
//     throw new Error('Unknown route ' + route + '.');
//   }
//   this.state.currentRoute = route;
//   this.render();
// };
//
// App.prototype.resumeApp = function() {
//   var accessToken = localStorage.getItem('access_token');
//
//   if (accessToken) {
//     this.state.authenticated = true;
//     this.state.accessToken = accessToken;
//   } else {
//     this.state.authenticated = false;
//     this.state.accessToken = null;
//   }
//
//   this.render();
// };
//
// App.prototype.render = function() {
//   var currRoute = this.state.routes[this.state.currentRoute];
//   var currRouteEl = getById(currRoute.id);
//   var element = document.importNode(currRouteEl.content, true);
//   this.container.innerHTML = '';
//   this.container.appendChild(element);
//   currRoute.onMount.call(this, this.container);
// };
//
// module.exports = App;
//
//
//
//
