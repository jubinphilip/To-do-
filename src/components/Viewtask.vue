<template>
  <v-container>
    <h2>Task List</h2>
    <div v-if="importantTasks.length > 0">
      <h3>Important Tasks</h3>
      <v-list>
        <v-list-item v-for="(task, index) in importantTasks" :key="index">
          <v-card class="mb-3">
            <v-card-title>
              <v-text-field v-if="task.editMode" v-model="task.title" label="Title"></v-text-field>
              <span v-else>{{ task.title }}</span>
            </v-card-title>
            <v-card-text>
              <v-textarea v-if="task.editMode" v-model="task.body" label="Description"></v-textarea>
              <p v-else>{{ task.body }}</p>
              <p>Status: {{ task.status ? 'Done' : 'Not Done' }}</p>
              <p>Deadline: {{ task.deadline }}</p>
              <p>Updated Time: {{ task.updated_time }}</p>
              <p>Created Time: {{ task.created_time }}</p>
              <v-radio-group v-model="task.status" row>
                <v-radio label="Done" :value="true"></v-radio>
                <v-radio label="Not Done" :value="false"></v-radio>
              </v-radio-group>
              <v-btn @click="setStatus(task)" color="primary">Set</v-btn>
              <v-btn @click="markImportant(task)" color="warning">Important</v-btn>
              <v-btn @click="deleteTask(task)" color="error">Delete</v-btn>
              <v-btn @click="toggleEditMode(task)" color="success">{{ task.editMode ? 'Save' : 'Edit' }}</v-btn>
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list>
    </div>

    <div v-if="nonImportantTasks.length > 0">
      <h3>Other Tasks</h3>
      <v-list>
        <v-list-item v-for="(task, index) in nonImportantTasks" :key="index">
          <v-card class="mb-3">
            <v-card-title>
              <v-text-field v-if="task.editMode" v-model="task.title" label="Title"></v-text-field>
              <span v-else>{{ task.title }}</span>
            </v-card-title>
            <v-card-text>
              <v-textarea v-if="task.editMode" v-model="task.body" label="Description"></v-textarea>
              <p v-else>{{ task.body }}</p>
              <p>Status: {{ task.status ? 'Done' : 'Not Done' }}</p>
              <p>Deadline: {{ task.deadline }}</p>
              <p>Updated Time: {{ task.updated_time }}</p>
              <p>Created Time: {{ task.created_time }}</p>
              <v-radio-group v-model="task.status" row>
                <v-radio label="Done" :value="true"></v-radio>
                <v-radio label="Not Done" :value="false"></v-radio>
              </v-radio-group>
              <v-btn @click="setStatus(task)" color="primary">Set</v-btn>
              <v-btn @click="markImportant(task)" color="warning">Important</v-btn>
              <v-btn @click="deleteTask(task)" color="error">Delete</v-btn>
              <v-btn @click="toggleEditMode(task)" color="success">{{ task.editMode ? 'Save' : 'Edit' }}</v-btn>
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.fetchTasks();
  },
  computed: {
    importantTasks() {
      return this.tasks.filter(task => task.important && !task.delete);
    },
    nonImportantTasks() {
      return this.tasks.filter(task => !task.important && !task.delete);
    }
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
            tasks.push({ ...data[key], id: key, editMode: false });
          }
          this.tasks = tasks;
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    },
    setStatus(task) {
      this.updateStatus(task);
    },
    updateStatus(task) {
      fetch(`https://todo-12c57-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: task.status
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task status');
        }
        console.log('Task status updated successfully');
      })
      .catch(error => {
        console.error('Error updating task status:', error);
      });
    },
    markImportant(task) {
      task.important = true;
      this.updateImportance(task);
    },
    updateImportance(task) {
      fetch(`https://todo-12c57-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          important: task.important
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task importance');
        }
        console.log('Task importance updated successfully');
        alert("Task added as Important")
      })
      .catch(error => {
        console.error('Error updating task importance:', error);
      });
    },
    deleteTask(task) {
      task.delete = true;
      fetch(`https://todo-12c57-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          delete: true
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        console.log('Task deleted successfully');
        alert("Task Deleted")
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
    },
    toggleEditMode(task) {
      task.editMode = !task.editMode;
      if (!task.editMode) {
        task.updated_time = new Date().toISOString();
        this.updateTask(task);
      }
    },
    updateTask(task) {
      fetch(`https://todo-12c57-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: task.title,
          body: task.body,
          updated_time: task.updated_time
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        console.log('Task updated successfully');
        alert("Task Updated")
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
    }
  }
}
</script>
<style scoped>
.v-card {
  padding: 20px;
}

.v-card-title,
.v-card-text {
  display: flex;
  flex-direction: column;
}

.v-btn {
  margin: 5px 0;
}
</style>
