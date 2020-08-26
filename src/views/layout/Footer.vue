<template>
  <div id="footer">
    <nav>
      <ul class="footer-navigation">
        <li v-bind:class="{'current': isCurrent(link)}" v-for="link in links" :key="link.label" v-on:click="routeTo(link.path)">
          <div style="font-size: 1.5rem;" class="mb-2"><font-awesome-icon :icon="link.icon" /><br></div>
          <span class="label">{{link.label}}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  import router from '../../router'
  export default {
    name: 'Footer',
    inject: [],
    data() {
      let links = [
        {
          label: "Home",
          icon: "home",
          component: "home",
          path: "/"
        },
        {
          label: "Articles",
          icon: "newspaper",
          component: "articles"
        },
        {
          label: "Order",
          icon: "store",
          component: "order"
        },
        {
          label: "More",
          icon: "bars",
          component: "more"
        },
      ];
      return {
        links
      }
    },
    methods: {
      routeTo(component) {
        this.$router.push({ path: component })
      },
      isCurrent(link) {
        return router.currentRoute.name === link.component;
      }
    },
    mounted() {}
  }
</script>
<style lang="scss">
  #footer {
    z-index: 1;
    background-color:black;
    padding:10px 0;
    padding-bottom: calc(env(safe-area-inset-bottom) + 10px);
    position:fixed;
    bottom:0;
    width:100vw;
    .footer-navigation {
      display:flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      list-style-type:none;
      color:white;
      margin:0;
      padding:0;
      li {
        flex:1;
        margin:0;
        padding:0;
        font-size:10px;
        text-align:center;
        &.current {
          .label {
            color: green;
          }
        }
        div {
          height:24px;
        }
      }
    }
  }
</style>
