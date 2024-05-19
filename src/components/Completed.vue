<template>
    <v-container>
      <h2>Completed Task List</h2>
      <v-list>
        <v-list-item v-for="(task, index) in filteredTasks" :key="index">
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title>{{ task.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ task.body }}</v-list-item-subtitle>
              <v-list-item-subtitle>Updated Time: {{ task.updated_time }}</v-list-item-subtitle>
              <v-list-item-subtitle>Created Time: {{ task.created_time }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="task.delete" style="color: red;">This task is deleted after completion</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  <script>
  export default {
    data() {
      return {
        tasks: [],
      };
    },
    computed: {
      filteredTasks() {
        return this.tasks.filter(task => task.status === true);
      }
    },
    created() {
      this.fetchTasks();
    },
    methods: {
      fetchTasks() {
        fetch('https://todo-12c57-default-rtdb.firebaseio.com/tasks.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch tasks');
            }
            return response.json();
          })
          .then(data => {
            const tasks = [];
            for (let key in data) {
              tasks.push({ ...data[key], id: key, editMode: false, updatedStatus: data[key].status });
            }
            this.tasks = tasks;
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      },
    }
  }
  </script>
  