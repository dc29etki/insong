<template>
  <div id="more" class="has-footer has-header">
    
    <div class="box">
      <div class="item">
        <div class="row">
          <div class="col-4 my-auto text-center">
            <font-awesome-icon :icon="['fa', 'user']" />
          </div>
          <div class="col-8 my-auto text-right">My Profile</div>
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
          <div class="col-8 my-auto text-right">Greeter Center</div>
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
    height: auto;
    background: #14213d;
    overflow: scroll !important;
    color: white;
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
      background: black;
      border-bottom: 2px solid white;
      border-top: 2px solid white;
      padding: 10px;
      .row{height: 10vh;}
    }
    font-size: 24px;
    svg {
      font-size: 40px;
    }
    &:hover {
      background: #ccc;
    }
  }
</style>
