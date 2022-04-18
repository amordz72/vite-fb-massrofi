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
              <th>name</th>
              <th>email</th>
              <th class="text-danger">Action</th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr v-for="p in users" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ p.email }}</td>
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
            <h5 class="modal-name" id="exampleModalLabel">Modal name</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-email">
            <div class="mb-2">
              <label for class="form-label">name</label>
              <input type="text" class="form-control" v-model="user.name" />
            </div>
            <div class="mb-2">
              <label for class="form-label">email</label>
              <input type="text" class="form-control" v-model="user.email" />
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

import { update, del,get_all } from "../../firebase/users";
////import { first, next, last } from "../../firebase/paginate";
import { first, next, prev ,last} from "../../firebase/pg-2";


import Add from '../../components/users/Add.vue'



export default {
  components: {
    Add,
  },
  data() {
    return {
      h_id: null,
      user: {
        name: '',
        email: '',

      },
      users: [],
      msg: '',
      hasError: false,
      limit: 1,
      order: 'name',
      first_p: '',
      last_p: '',
    };
  },
  methods: {

    get: async function () {

      await this.first();
      //await  get_all ;
     
    },
    first: async function () {

      this.users = [];
      var dd = await get_all()
      this.users = dd.result;
      this.last_p = dd.lastVisible
      console.log("this.users");
      console.log(this.users);

    },
    next: async function () {
      this.users = [];

      var dd = (await next(this.last_p))

      this.users = await dd.result;
      this.last_p = dd.lastVisible
      this.start_p = dd.firstVisible


    },
    prev: async function () {

      this.users = [];
     
      var dd = (await prev(this.start_p))

      this.users = await dd.result;
      this.last_p = dd.lastVisible


    },
    last: async function () {

     
      var dd = (await last(this.last_p))

      this.users = await dd.result;
      this.last_p = dd.lastVisible


    },

    del: async function (id) {
      del(id)
      this.get(); //
    },
    update: async function () {
      const r = await update(this.h_id, this.user)

      this.hasError = r


      this.get(); //
    },
    edit(po) {
      this.h_id = po.id
      this.user.name = po.name
      this.user.email = po.email
    },
  },
  mounted() {

    this.first();//
    
    console.log('this.users');


  },
};
</script>
 

<style scoped>
.nav-btn {
  cursor: pointer !important;
}
</style>