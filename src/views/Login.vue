<template>
  <div class="container">
    <h1>Login Page</h1>

    <form @submit="prevent"></form>
    <div class="mb-3">
      <label for="" class="form-label"></label>
      <input
        type="email"
        class="form-control"
        v-model="user.email"
        aria-describedby="emailHelpId"
        placeholder=""
      />
      <small id="emailHelpId" class="form-text text-muted">Help text</small>
    </div>
    <div class="mb-3">
      <label for="" class="form-label"></label>
      <input
        type="password"
        class="form-control"
        v-model="user.pw"
        aria-describedby="emailHelpId"
        placeholder=""
      />
      <small id="emailHelpId" class="form-text text-muted">Help text</small>
    </div>

    <button type="input" class="btn btn-primary" @click="login">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";
const auth = getAuth(app);

export default {
  data() {
    return {
      user: {
        email: "",
        pw: "",
        msg: "",
      },
    };
  },
  methods: {
    get_users: function () {
      var me = this;
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((dd) => {
          me.users = dd.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login: async function () {
      var me = this;
      await signInWithEmailAndPassword(auth, this.user.email, this.user.pw)
        .then((userCredential) => {
          me.$store.dispatch("set_user", userCredential);
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  mounted() {
    // this.login("dzamor72@gmail.com", "12345678");
  },
};
</script>