<template>
  <div class="container">
    <h1>Abaut Page</h1>

    <ul>
      <ol v-for="user in users" :key="user.id">
        {{
          user.name
        }}
      </ol>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    get_users: function () {
      var me = this;
      axios
        .get("http://code-builder-528e4.appspot.com/users")
        .then((dd) => {
          me.users = dd.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.get_users();
  },
};
</script>