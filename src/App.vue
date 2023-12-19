<template>
  <div id="app">
    <p v-if="usersLoading">
      Loading users...
    </p>
    <template v-if="!usersLoading">
      <button @click="toggleCardsView" type="button">
        toggle users view
      </button>
      <table-view
        v-if="!displayCardsView"
        :headers="headers"
        :items="usersList"
      />
      <cards-view
        v-if="displayCardsView"
        :items="usersList"
      />
    </template>
  </div>
</template>

<script>
import api from '@/api/user';

import { mapState, mapActions } from 'vuex'

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

  computed: {
    ...mapState({
      displayCardsView: state => state.user.displayCardsView,
    }),
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

  methods: {
    ...mapActions({
      toggleCardsView: 'user/toggleCardsView',
    }),
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
