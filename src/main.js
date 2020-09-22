import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as firebase from "firebase";
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome)
library.add(faNewspaper)
library.add(faStore)
library.add(faBars)
library.add(faUser)
library.add(faList)
library.add(faMicrophone)


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
        }
  ]
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


