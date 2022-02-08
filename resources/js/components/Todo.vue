<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Todo</div>

          <div class="card-body">
            <div class="input-group">
              <input
                type="text"
                placeholder="Todo.."
                class="form-control"
                aria-label="todo"
                aria-describedby="todo"
                v-model="todo_input"
              />
              <div class="input-group-append">
                <button type="button" class="btn btn-info" @click="saveTodo()">
                  Add
                </button>
              </div>
            </div>

            <table class="table table-dark table-bordered mt-4">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(todo, index) in todos" :key="index">
                  <td>{{ ++index }}</td>
                  <td>{{ todo.name }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      @click="deleteTodo(--index)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      api: "http://127.0.0.1:8000/api/todos",
      todo_input: "",
    };
  },

  mounted() {
    this.axios.get(this.api).then((res) => {
      //   console.log(res);
      this.todos = res.data;
    });
  },
  methods: {
    saveTodo() {
      //   console.log(this.todo_input);
      if (this.todo_input.length > 0) {
        let data = { name: this.todo_input };
        this.axios.post(this.api, data).then((res) => {
          this.todos.push(res.data);
          this.todo_input = "";
        });
      }
    },
    deleteTodo(index) {
      if (this.todos[index].id) {
        this.axios.delete(this.api + "/" + this.todos[index].id).then((res) => {
          this.todos.splice(index, 1);
        });
      }
    },
  },
};
</script>
