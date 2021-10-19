<template>
  <section class="vh-100" style="background-color: #3da2c3">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 15px">
            <p class="h1 text-center mt-3 mb-4 pb-3 text-secondary">
              <u>Туду лист</u>
            </p>

            <div class="card-body p-5">
              <form class="d-flex mb-4" @submit.prevent="addTodo()">
                <div class="form-outline flex-fill">
                  <input
                    type="text"
                    id="form3"
                    class="form-control"
                    placeholder="Введите что планируете сделать"
                    v-model="newTodo"
                    name="newTodo"
                    autocomplete="off"
                  />
                </div>
                <button type="submit" class="btn btn-primary ms-2 px-2">
                  Добавить
                </button>
              </form>

              <ul class="list-group mb-0">
                <li
                  class="
                    list-group-item
                    d-flex d-flex
                    justify-content-between
                    align-items-center
                    border-start-0 border-top-0 border-end-0 border-bottom
                    rounded-0
                    mb-2
                  "
                  v-for="(todo, index) in todos"
                  :key="index"
                >
                  <div class="d-flex align-items-center">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      aria-label="..."
                      :checked="todo.done"
                      @click="doneTodo(todo)"
                    />
                    <div class="form-outline flex-fill">
                      <input
                        v-if="todo.edit"
                        type="text"
                        class="form-control"
                        v-model="todo.content"
                        name="newTodo"
                      />
                    </div>
                    <component
                      v-if="!todo.edit"
                      :is="todo.done ? 's' : 'div'"
                      >{{ todo.content }}</component
                    >
                  </div>
                  <div class="align-items-end">
                    <button
                      v-if="todo.edit"
                      @click="updateTodo(todo)"
                      type="button"
                      class="btn btn-warning"
                    >
                      Сохранить
                    </button>
                    <button
                      v-if="!todo.edit"
                      type="button"
                      class="btn btn-success ms-2 px-2"
                      @click="todo.edit = true"
                    >
                      Изменить
                    </button>
                    <button
                      @click="removeTodo(index, todo.id)"
                      class="btn btn-primary ms-2 px-2"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              </ul>
              <h4
                class="h1 text-center mt-3 mb-4 pb-3 text-secondary"
                v-if="todos.length === 0"
              >
                Список дел пуст
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    onMounted(() => {
      axios({
        method: "get",
        url: "/api/todos",
      }).then(function (response) {
        todos.value = response.data.data.map(e => ({...e, edit : false}));
      });
    });


    const newTodo = ref("");
    const todos = ref([]);

    function addTodo() {
      if (newTodo.value) {
        axios({
          method: "post",
          url: "/api/todos",
          data: {
            done: false,
            content: newTodo.value,
          },
        }).then(function (response) {
          if (!response.error) {
            todos.value.push({
              id: response.data.data[0],
              done: false,
              content: newTodo.value,
            });
            newTodo.value = "";
          }
        });
      }
    }

    function updateTodo(todo) {
      axios({
        method: "patch",
        url: "/api/todos/" + todo.id,
        data: {
          content: todo.content,
        },
      }).then(function (response) {
        if (!response.error) {
          todo.edit = false;
        }
      });
    }

    function doneTodo(todo) {
      let done = todo.done == true ? 0 : 1
      axios({
        method: "patch",
        url: "/api/todos/" + todo.id,
        data: {
          done
        },
      }).then(function (response) {
        if (!response.error) {
          todo.done = !todo.done;
        }
      });
    }

    function removeTodo(index, id) {
      axios({
        method: "delete",
        url: "/api/todos/" + id,
      }).then(function (response) {
        if (!response.error) {
          todos.value.splice(index, 1);
        }
      });
    }

    return {
      todos,
      newTodo,
      addTodo,
      doneTodo,
      removeTodo,
      updateTodo,
      // tag
    };
  },
};
</script>
