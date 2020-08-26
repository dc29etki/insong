<template>
  <div class="container p-0">
  <navbar></navbar>
    <div id="login" class="row p-4 justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header"><h5>Login to InSong</h5></div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
              <div class="mt-3">
                No account? <a href="/register">Sign Up Now</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  <Footer></Footer>
  </div>
</template>

<script>
import firebase from "firebase";
import navbar from './Navbar.vue';
import Footer from './layout/Footer';

export default {
  name: 'Login',
  components: {Footer, navbar},
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ path: "/" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style lang="scss">
  #login {
    height: 100vh;
    background: #14213d;
    overflow: hidden;
    button {
      background: #fca311;
      border: none;
    }
  }
</style>
