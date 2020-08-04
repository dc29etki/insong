<template>
  <div id="header">
    <nav>
      HELLO
      <span v-if="user.loggedIn"></span><span v-else>hi</span>
    </nav>
  </div>
</template>
<script>
  import router from '../../router'
  import * as firebase from "firebase";
  import { mapGetters } from "vuex";
  export default {
    name: 'Header',
    props: ['headerControls'],
    inject: [],
    computed: {
        ...mapGetters({
          user: "user"
        })
      },
    data() {
      return {
        nothing: true
      }
    },
    methods: {
      signOut() {
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.$router.replace({
                  name: "home"
                });
              });
          },
      routeTo(component) {
        if (component === "back") {
          router.go(-1);
        } else {
          router.push({ name: component });
        }
      }
    }
  }
</script>
<style lang="scss">
  #header {
    z-index: 1;
    background:black;
    padding:10px;
    padding-top: calc(env(safe-area-inset-top) + 10px);
    position:fixed;
    top:0;
    width:100vw;
    nav {
      display:flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      div {
        flex:1;
        img {
          width:12.5vw;
        }
        .text {
          color:white;
          line-height:46px;
          text-transform:uppercase;
          font-size:12px;
          display:block;
          text-align:center;
          font-weight:800;
        }
      }
      #left {
        .back {
          font-weight:600;
          font-size:36px;
        }
      }
      #center {
        flex:6;
      }
    }
  }
</style>
