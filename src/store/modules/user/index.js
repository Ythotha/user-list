import router from '@/router';

const state = () => ({
  authorizedAs: localStorage.getItem('authorizedAs'),
  displayCardsView: JSON.parse(localStorage.getItem('displayCardsView'))
})

const getters = {
  isAuthorized(state) {
    return !!state.authorizedAs
  }
}

const actions = {
  signIn({ commit }, role) {
    localStorage.setItem('authorizedAs', role)
    commit('setUserRole', role)
    router.push({ name: 'contacts' })
  },

  toggleCardsView({ state, commit }) {
    commit('toggleCardsView')
    localStorage.setItem('displayCardsView', state.displayCardsView)
  }
}

const mutations = {
  setUserRole(state, role) {
    state.authorizedAs = role
  },

  toggleCardsView(state) {
    state.displayCardsView = !state.displayCardsView
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}