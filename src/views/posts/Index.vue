<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12">
        <div class="alert" :class="{ 'alert-info': msg, 'alert-danger': hasError }"></div>
      </div>

      <div class="col-md-4">
        <Add @get="get"></Add>
      </div>
      <div class="col-md-8">
        <table class="table table-responsive table-hover text-center">
          <thead class="table-dark">
            <tr>
              <th>Title</th>
              <th>body</th>
              <th class="text-danger">Action</th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr v-for="p in posts" :key="p.id">
              <td>{{ p.title }}</td>
              <td>{{ p.body }}</td>
              <td>
                <button
                  class="btn btn-info"
                  @click.stop.prevent="edit(p)"
                  data-bs-toggle="modal"
                  data-bs-target="#update_model"
                >update</button>
                <button class="btn btn-danger" @click.stop.prevent="del(p.id)">del</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation mt-4">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link nav-btn" @click="next">Next</a>
          </li>
          <li class="page-item">
            <a class="page-link nav-btn" @click="prev">Prev</a>
          </li>
          <li class="page-item">
            <a class="page-link nav-btn" @click="first">First</a>
          </li>
          <li class="page-item">
            <a class="page-link nav-btn" @click="last">Last</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- up -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="update_model"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label for class="form-label">Title</label>
              <input type="text" class="form-control" v-model="post.title" />
            </div>
            <div class="mb-2">
              <label for class="form-label">Body</label>
              <input type="text" class="form-control" v-model="post.body" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="update"
              data-bs-dismiss="modal"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
    <!-- e-up -->
  </div>
</template>

<script>

import router from "../../router";

import { add_post, update_post, del_post, get_all_posts } from "../../firebase/posts";
//import { first, next, last } from "../../firebase/paginate";
import { first, next, prev ,last} from "../../firebase/pg-2";


import Add from '../../components/posts/Add.vue'



export default {
  components: {
    Add,
  },
  data() {
    return {
      h_id: null,
      post: {
        title: '',
        body: '',

      },
      posts: [],
      msg: '',
      hasError: false,
      limit: 1,
      order: 'title',
      first_p: '',
      last_p: '',
    };
  },
  methods: {

    get: async function () {



      await this.first();
      // console.log('this.posts');
      // console.log(this.posts);

      // console.log(me.posts);
    },
    first: async function () {

      this.posts = [];

      var dd = await first()
      this.posts = dd.result;
      this.last_p = dd.lastVisible

    },
    next: async function () {
      this.posts = [];

      var dd = (await next(this.last_p))

      this.posts = await dd.result;
      this.last_p = dd.lastVisible
      this.start_p = dd.firstVisible


    },
    prev: async function () {

      this.posts = [];
     
      var dd = (await prev(this.start_p))

      this.posts = await dd.result;
      this.last_p = dd.lastVisible


    },
    last: async function () {

     
      var dd = (await last(this.last_p))

      this.posts = await dd.result;
      this.last_p = dd.lastVisible


    },

    del: async function (id) {
      del_post(id)
      this.get(); //
    },
    update: async function () {
      const r = await update_post(this.h_id, this.post)

      this.hasError = r


      this.get(); //
    },
    edit(po) {
      this.h_id = po.id
      this.post.title = po.title
      this.post.body = po.body
    },
  },
  mounted() {

    this.get();
    // console.log('this.posts');


  },
};
</script>
 

<style scoped>
.nav-btn {
  cursor: pointer !important;
}
</style>