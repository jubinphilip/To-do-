<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item-group>
          <v-list-item :to="{ path: '/add' }">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add Task</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/view' }">
            <v-list-item-icon>
              <v-icon>mdi-view-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>View Task</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/completed' }">
            <v-list-item-icon>
              <v-icon>mdi-checkbox-marked</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Completed Task</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/remaining' }">
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Remaining Task</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>To-Do App</v-toolbar-title>
    </v-app-bar>

    <v-main id="app">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  
background-image: url('components/images.jpg');
  background-size: cover;
  background-position: center;
}
</style>
