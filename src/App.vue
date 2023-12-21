<template>
  <div id="app">
    <p v-if="usersLoading">
      Loading users...
    </p>
    <template v-if="!usersLoading">
      <button @click="toggleCardsView" type="button">
        toggle users view
      </button>
      <div class="sorting">
        <h2>
          Sorting
        </h2>
        <label>
          Name
          <select v-model="sortingByName" name="" id="">
              <option value="">initial</option>
              <option value="asc">ascending (A-Z)</option>
              <option value="desc">descending (Z-A)</option>
            </select>
        </label>
      </div>
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
        :items="paginatedData"
      />
      <cards-view
        v-if="displayCardsView"
        :items="paginatedData"
      />
      
      <div class="pagination">
        <button @click="prevPage" type="button" :disabled="currentPage === 0">
          Prev page
        </button>
        <button
          v-for="(page, index) in totalPages"
          :key="page"
          @click="changePage(index)"
          :disabled="currentPage === index"
          type="button"
        >
          {{ page }}
        </button>
        <button @click="nextPage" type="button" :disabled="currentPage >= totalPages - 1">
          Next page
        </button>
      </div>

      <div class="statistics">
        <h2>
          Statistics
        </h2>
        <div>
          <span>
            Total users: {{ statistics.totalUsers }}
          </span>
        </div>
        <div>
          <span>
            Total males: {{ statistics.male }}
          </span>
        </div>
        <div>
          <span>
            Total females: {{ statistics.female }}
          </span>
        </div>
        <div>
          <span>
            Majority: {{ majorityBySex }}
          </span>
        </div>
        <h3>
          Users by nationality
        </h3>
        <div
          v-for="(item, key) in statistics.nat"
          :key="key"
        >
          <span>
            {{ key }}: {{ item }}
          </span>
        </div>
      </div>
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
      sortingByName: '',
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
        gender: '',
        fullname: null,
        nat: null,
      },
      itemsPerPage: 10,
      currentPage: 0,
    }
  },

  computed: {
    ...mapState({
      displayCardsView: state => state.user.displayCardsView,
    }),

    sortedUsers() {
      if (this.sortingByName === 'asc') {
        return this.usersList.slice(0).sort((a, b) => this.getUserFullname(a).localeCompare(this.getUserFullname(b)))
      }

      if (this.sortingByName === 'desc') {
        return this.usersList.slice(0).sort((a, b) => this.getUserFullname(b).localeCompare(this.getUserFullname(a)))
      }
      
      return this.usersList
    },
    
    filteredUsers() {
      const filterKyes = Object.keys(this.filters)

      return this.sortedUsers.filter((user) => {
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

    totalPages(){
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },

    paginatedData() {
      const start = this.currentPage * this.itemsPerPage,
            end = start + this.itemsPerPage

      return this.filteredUsers.slice(start, end);
    },

    statistics() {
      return this.usersList.reduce((acc, currentItem) => {
        acc[currentItem.gender]++

        if (!acc.nat[currentItem.nat]) {
          acc.nat[currentItem.nat] = 0
        }
        acc.nat[currentItem.nat]++

        return acc
      }, { totalUsers: this.usersList.length, male: 0, female: 0, nat: {} })
    },

    majorityBySex() {
      const { male: malesQuantity, female: femalesQuantity, totalUsers } = this.statistics
      if (malesQuantity === femalesQuantity) return 'equal'

      let majority
      if (malesQuantity > femalesQuantity) {
        majority = malesQuantity
      } else {
        majority = femalesQuantity
      }
      return `males (${ majority / totalUsers * 100 }%)`
    }
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

    getUserFullname(user) {
      return `${user.name.first} ${user.name.last}`
    },

    prevPage(){
      this.currentPage--;
    },

    nextPage(){
      this.currentPage++;
    },

    changePage(index) {
      this.currentPage = index
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
