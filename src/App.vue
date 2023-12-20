<template>
  <div id="app">
    <p v-if="usersLoading">
      Loading users...
    </p>
    <template v-if="!usersLoading">
      <button @click="toggleCardsView" type="button">
        toggle users view
      </button>
      <div class="filters">
        <h2>
          Filters
        </h2>
        <div class="filters__grid">
          <label class="filters__item">
            Name
            <input v-model="filters.fullname" type="text">
          </label>
          <label class="filters__item">
            Nationality
            <input v-model="filters.nat" type="text">
          </label>
          <label class="filters__item">
            Sex
            <select v-model="filters.gender" name="" id="">
              <option value="">both</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </label>
        </div>
      </div>
      <table-view
        v-if="!displayCardsView"
        :headers="headers"
        :items="filteredUsers"
      />
      <cards-view
        v-if="displayCardsView"
        :items="filteredUsers"
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
      ],
      filters: {
        gender: null,
        fullname: null,
        nat: null,
      }
    }
  },

  computed: {
    ...mapState({
      displayCardsView: state => state.user.displayCardsView,
    }),
    
    filteredUsers() {
      const filterKyes = Object.keys(this.filters)

      return this.usersList.filter((user) => {
        return filterKyes.every((filterKey) => {
          if (!this.filters[filterKey]?.length) {
            return true
          }

          if (filterKey === 'gender' && !this.filters[filterKey]) return true
          if (filterKey === 'gender') {
            return user[filterKey] === this.filters[filterKey]
          }

          let userValue
          if (filterKey === 'fullname') {
            userValue = `${user.name.first} ${user.name.last}`
          } else {
            userValue = user[filterKey]
          }

          return userValue.toLowerCase().includes(this.filters[filterKey])
        })
      })
    },
  },

  async mounted() {
    try {
      this.usersList = await api.getUsersData(100)
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
