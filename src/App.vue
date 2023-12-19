<template>
  <div id="app">
    <p v-if="usersLoading">
      Loading users...
    </p>
    <template v-if="!usersLoading">
      <table-view
        :headers="headers"
        :items="usersList"
      />
      <cards-view
        :items="usersList"
      />
    </template>
  </div>
</template>

<script>
import api from '@/api/user';

import TableView from '@/components/TableView.vue';
import CardsView from '@/components/CardsView.vue';

export default {
  name: 'App',

  components: {
    TableView,
    CardsView,
  },

  data() {
    return {
      usersLoading: true,
      usersList: undefined,
      headers: [
        'Avatar',
        'Fullname',
        'Date of birth',
        'Email',
        'Phone',
        'Location',
        'Nationality',
        'Sex',
      ]
    }
  },

  async mounted() {
    try {
      this.usersList = await api.getUsersData(5)
      this.usersLoading = false
    } catch (error) {
      console.log('users loading error')
      console.log(error)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
