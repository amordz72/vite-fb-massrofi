

<template>
  <div class="">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active" aria-current="page"
                >Home</router-link
              >
              </li>
              <li>
              <router-link to="/users" class="nav-link  " aria-current="page"
                >Users</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">Abaut</router-link>
            </li>
            <li class="nav-item" v-if="current_user=='Gust'">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="current_user!='Gust'">
              <a class="nav-link logout" @click="logout">logout</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="post_list"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              Posts
              </a>
              <ul class="dropdown-menu" aria-labelledby="post_list">
                <li><router-link to="/posts" class="dropdown-item">All</router-link></li>
                <li><router-link to="/post/create" class="dropdown-item">Create</router-link></li>
             
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="user_list"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ current_user.replace('@gmail.com', '') }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="user_list">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
                >Disabled</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script >
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
const auth = getAuth(app);
import router from "../router";

/**/
export default {
  computed: {
    current_user: function () {
      if (this.$store.state.user != null) {
        return this.$store.state.user.email;
      } else {
        return "Gust";
      }

    },
  },
  methods: {
    logout: function () {
      signOut(auth)
        .then(() => {
          this.$store.dispatch("destroy_user");
        })
        .then(() => {
          router.push("/login"); //
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        }); /* */
    },
    onAuthStateChanged: function () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          router.push('login')
          // User is signed out
          // ...
        }
      });
    },
  },
};
</script>



<style scoped>
a {
  color: rgb(28, 105, 221);
  text-decoration: none;
}
.logout {
  cursor: pointer;
}
.router-link-exact-active {
  color: #eb2626 !important;
}
</style>
