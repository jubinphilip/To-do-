<template>
    <v-container>
      <h2>Incomplete Tasks</h2>
      <v-list>
        <v-list-item v-for="(task, index) in incompleteTasks" :key="index">
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title>{{ task.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ task.body }}</v-list-item-subtitle>
              <v-list-item-subtitle>Updated Time: {{ task.updated_time }}</v-list-item-subtitle>
              <v-list-item-subtitle>Created Time: {{ task.created_time }}</v-list-item-subtitle>
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
      incompleteTasks: [],
    };
  },
  created() {
    this.fetchIncompleteTasks();
  },
  methods: {
    fetchIncompleteTasks() {
      fetch('https://todo-12c57-default-rtdb.firebaseio.com/tasks.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }
          return response.json();
        })
        .then(data => {
          const incompleteTasks = [];
          for (let key in data) {
            if (!data[key].status) {
              incompleteTasks.push({ ...data[key], id: key, updatedStatus: data[key].status });
            }
          }
          this.incompleteTasks = incompleteTasks;
        })
        .catch(error => {
          console.error('Error fetching incomplete tasks:', error);
        });
    },
  }
}
</script>
<style scoped>
.v-list-item-content {
  padding: 16px;
}

.v-list-item-title {
  font-size: 18px;
  font-weight: bold;
}

.v-list-item-subtitle {
  font-size: 14px;
  color: #555;
}

.v-list-item-subtitle + .v-list-item-subtitle {
  margin-top: 8px;
}
</style>
  