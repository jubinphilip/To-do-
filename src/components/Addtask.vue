<template>
    <div id="add-task">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <h1>Add Your Task</h1>
            <div class="text-center">
              <form @submit.prevent="post">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="task.title" label="Add Title" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="task.body" label="Add Task" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field type="date" v-model="task.deadline" label="Add Deadline" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn color="primary" @click="clearFields">Clear</v-btn> 
                    <v-btn color="primary" type="submit">Submit</v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        task: {
          title: '',
          body: '',
          status: false,
          updated_time: null,
          created_time: null,
          deadline: null
        }
      };
    },
    methods: {
      post() {
        const currentTime = new Date().toISOString();
        this.task.updated_time = currentTime;
        this.task.created_time = currentTime;
        
        fetch('https://todo-12c57-default-rtdb.firebaseio.com/tasks.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.task)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add task');
          }
          return response.json();
        })
        .then(data => {
          console.log('Task added successfully:', data);
         alert("Task Added") 
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
      },
      clearFields() {
        this.task.title = '';
        this.task.body = '';
        this.task.deadline = null;
      }
    }
  };
  </script>
  
  <style scoped>
 
  </style>
  