<!DOCTYPE html>
<template>
  <div id="ty" class="has-footer has-header text-center">
    <div class="space pb-3 mt-3"> </div>
    <h1 class="pt-5">Thank You!</h1>
    <h5 class="px-4">You order has been added to the queue! The next available greeter will claim and complete your greeting.</h5>
    <br>
    <h6 class="pt-5">Track your order and get real-time updates at</h6>
    <router-link to="/my-orders" class="btn btn-insong">My Orders</router-link>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'More',
    components: {},
    inject: [],
      computed: {

      },
    methods: {
    },
    created() {
    }
    
  }
</script>
<style lang="scss">
  #ty {
    overflow: scroll !important;
    color: #232323;
    height: 100vh;
    background: white;
  }
  h1 {
    color: #FF9A00;
  }
  h2, h3, h4, h5 {
    color: #232323;
  }
  .row {
    width: 100% !important;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .item {
      width: 100%;
      background: white;
      color: black !important;
      border-bottom: 2px solid black;
      border-top: 2px solid black;
      .row{height: 10vh;}
      a {
        color: black !important;
      }
    }
    font-size: 20px;
    svg {
      font-size: 36px;
    }
    &:hover {
      background: #ccc;
    }
  }
  .btn-insong {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 15vh;
    width: 15vh;
    border-radius: 50%;
    background: #FF9A00;
    color: white;
    font-weight: 900;
    font-size: 18px;
  }
</style>
