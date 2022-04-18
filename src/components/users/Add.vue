<template>
    <div class="container">
        <div class="mb-2">
            <label for class="form-label">Title</label>
            <input type="text" class="form-control" v-model="title" />
        </div>
        <div class="mb-2">
            <label for class="form-label">Body</label>
            <input type="text" class="form-control" v-model="body" />
        </div>

        <button type="submit" @click.stop.prevent="add">add</button>
    </div>
</template>

<script>


import { collection, addDoc, getFirestore } from "firebase/firestore";

import app from "../../firebase";
const db = getFirestore(app);

export default {
      
    data() {
        return {
            title: '',
            body: '',
        };
    },
    methods: {

        add: async function () {
            try {

                const docRef = await addDoc(collection(db, "posts"), {
                    title: this.title,
                    body: this.body,
                });

              //   console.log("Document written with ID: ", docRef.id);

           this.$emit('get' );    

            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
    },
    mounted() {
        // this.get_users();
    },
};
</script>

<style>
</style>