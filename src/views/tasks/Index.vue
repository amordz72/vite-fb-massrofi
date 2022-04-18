<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <div class="container">
                    <h1>Tasks</h1>
                    <div class="mb-2">
                        <label for class="form-label">Name</label>
                        <input type="text" class="form-control" v-model="task.name" />
                    </div>


                    <button type="submit" @click.stop.prevent="add">add</button>
                </div>
            </div>
            <div class="col-md-8">
                <table class="table table-responsive table-hover text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>name</th>

                            <th class="text-danger">Action</th>
                        </tr>
                    </thead>
                    <tbody class="table-light">
                        <tr v-for="p in tasks" :key="p.id">
                            <td>{{ p.name }}</td>

                            <td> <button class="btn btn-info" @click.stop.prevent="edit(p)" data-bs-toggle="modal"
                                    data-bs-target="#update_model">update</button>
                                <button class="btn btn-danger" @click.stop.prevent="del(p.id)">del</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { add, update, del, get_all } from "../../firebase/tasks";
export default {

    components: {

    },
    data() {
        return {
            h_id: null,
            task: {
                name: '',

            },
            tasks: [],
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

            //await this.first();
            this.tasks = await get_all();

        },
        add: async function () {
            await add(this.task);

            this.get();//
        },

        del: async function (id) {
            del(id)
            this.get(); //
        },
        update: async function () {
            const r = await update(this.h_id, this.user)

            this.get(); //

        },
        edit(po) {
            this.h_id = po.id
            this.user.name = po.name
            this.user.email = po.email
        },
    },
    mounted() {

        this.get();//

        console.log('task start');


    },
};
</script>

<style>
</style>