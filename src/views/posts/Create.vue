<template>
  <div class="container">
    <button type="submit" @click="add()">add</button>
  </div>
</template>

<script>
//import { collection, addDoc, getFirestore } from "firebase/firestore";

//import app from "../../firebase";
//const db = getFirestore(app);
//const db = getFirestore(app);

import { add_post } from "../../firebase/posts";

export default {
  data() {
    return {
      posts: [],
      obj: {
        title: "Alan11",
        body: "lorem 155",
      },
    };
  },
  methods: {
    add() {
return add_post(this.obj);
      
    },
  },
  mounted() {
    // this.get_users();
  },
};


</script>

<style>
</style>