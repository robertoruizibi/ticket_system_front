// File to manage USER states
export const state = () => ({
  user: {},
})

export const getters = {
  getUser: state => {
    return state.user
  }
}
export const mutations = {
  storeUser(state, user) {
    state.user = Object.assign({}, user)
  }
}