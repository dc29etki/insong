import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as firebase from "firebase";
import store from "./store";
import VueAxios from './plugins/axios'

Vue.use(VueAxios)


Vue.use(VueRouter);

import Home from './views/Home.vue';
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import navbar from "./views/Navbar";
import order from "./views/Order";


import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome)
library.add(faNewspaper)
library.add(faStore)
library.add(faBars)


Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { 
            path: '/',
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
            component: order
        }
  ]
});

const firebaseConfig = {
  apiKey: "AIzaSyCSl8YKPaQkuVno6XILrc0uEgZZQVdCG5w",
  authDomain: "insong-94de5.firebaseapp.com",
  databaseURL: "https://insong-94de5.firebaseio.com",
  projectId: "insong-94de5",
  storageBucket: "insong-94de5.appspot.com",
  messagingSenderId: "523033426454",
  appId: "1:523033426454:web:33cdc5e9c89a0912eb5337",
  measurementId: "G-MDH2QBJCMT"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

var database = firebase.database();


new Vue({
  router,
  store,
  template: `
      <div>
        <main class="pb-4">
          <router-view></router-view>
        </main>
      </div>
      `
}).$mount('#app');


