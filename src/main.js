import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as firebase from "firebase";
import store from "./store";

Vue.use(VueRouter);

import Home from './views/Home.vue';
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import navbar from "./views/Navbar";

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
        }
  ]
});




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
