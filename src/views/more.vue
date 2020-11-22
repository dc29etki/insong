<!DOCTYPE html>
<template>
  <div id="more" class="has-footer has-header noselect">
    <div class="pb-4 mb-5"> </div>
    
    
    <div class="box">
      <div class="item">
        <div class="row">
          <div class="col-4 my-auto text-center">
            <font-awesome-icon :icon="['fa', 'user']" />
          </div>
          <div class="col-8 my-auto text-right"><router-link to="profile">My Profile</router-link></div>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <div class="col-4 my-auto text-center">
            <font-awesome-icon :icon="['fa', 'list']" />
          </div>
          <div class="col-8 my-auto text-right"><router-link to="my-orders">My Orders</router-link></div>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <div class="col-4 my-auto text-center">
            <font-awesome-icon :icon="['fa', 'microphone']" />
          </div>
          <div class="col-8 my-auto text-right"><router-link to="/switchboard">Greeter Switchboard</router-link></div>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <div class="col-4 my-auto text-center">
            <font-awesome-icon :icon="['fa', 'question']" />
          </div>
          <div class="col-8 my-auto text-right"><router-link to="/switchboard">Help</router-link></div>
        </div>
      </div>
    </div>
    
    
    
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
  #more {
    overflow: scroll !important;
    color: white;
    height: 100vh;
    background: black;
  }
  h1 {
    font-weight:900;
  }
  
  h2 {
    color: #fca311;
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
</style>
