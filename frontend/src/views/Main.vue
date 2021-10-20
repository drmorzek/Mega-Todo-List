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

                    <component :is="todo.done ? 's' : 'div'">{{
                      todo.content
                    }}</component>
                  </div>
                  <div class="align-items-end">
                    <button
                      v-if="!todo.edit"
                      type="button"
                      class="btn btn-success ms-2 px-2"
                      @click="showModal(todo, index)"
                    >
                      Изменить
                    </button>
                    <button
                      v-if="!todo.edit"
                      @click="removeTodo(todo.id, index)"
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

    <div ref="modalRef" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Редактировать</h5>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control"
              v-model="editTodo.content"
              name="newTodo"
            />
          </div>
          <div class="modal-footer">
            <button
              @click="updateTodo(editTodo)"
              type="button"
              class="btn btn-warning"
            >
              Сохранить
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="hideModal()"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

import { Modal } from "bootstrap";

export default {
  name: "Product Details",
  setup() {
    const modalRef = ref(null);
    const editTodo = ref({});
    let dialog;
    const showModal = (todo, index) => {
      todos.value.forEach((element) => {
        element.edit = true;
      });
      editTodo.value = {
        content: todo.content,
        id: todo.id,
        index,
      };
      dialog.show();
    };
    const hideModal = () => {
      dialog.hide();
    };

    onMounted(() => {
      dialog = new Modal(modalRef.value);
      modalRef.value.addEventListener("hidden.bs.modal", function () {
        todos.value.forEach((element) => {
          element.edit = false;
        });
        editTodo.value = {};
      });

      axios({
        method: "get",
        url: "/api/todos",
      }).then(function (response) {
        todos.value = response.data.data.map((e) => ({ ...e, edit: false }));
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

    function updateTodo(editTodo) {
      axios({
        method: "patch",
        url: "/api/todos/" + editTodo.id,
        data: {
          content: editTodo.content,
        },
      }).then(function (response) {
        if (!response.error) {
          todos.value[editTodo.index].content = editTodo.content;
          dialog.hide();
        }
      });
    }

    function doneTodo(todo) {
      let done = todo.done == true ? 0 : 1;
      axios({
        method: "patch",
        url: "/api/todos/" + todo.id,
        data: {
          done,
        },
      }).then(function (response) {
        if (!response.error) {
          todo.done = !todo.done;
        }
      });
    }

    function removeTodo(id, index) {
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
      modalRef,
      editTodo,
      showModal,
      hideModal,
    };
  },
};
</script>
