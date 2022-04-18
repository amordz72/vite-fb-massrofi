<template>
  <div class="container">
    <h1>Home</h1>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
const auth = getAuth(app);
import router from "../router";

export default {
  methods: {
    onAuthStateChanged: function () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
  },
  mounted() {
    if (this.$store.state.user != null) {
     // alert(this.$store.state.user.email);
    } else {
      router.push("/login"); //
    }
  },
};
</script>