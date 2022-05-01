// File to manage SIDENAVBAR states
export const state = () => ({
  sideNavBar: true,
  previousRoute: '',
  sharedRoute: ''
})

export const getters = {
  getSideNavBar: state => {
    return state.sideNavBar
  },
  getPreviousRoute: state => {
    return state.previousRoute
  },
  getSharedRoute: state => {
    return state.sharedRoute
  }
}
export const mutations = {
  storeSideNavBar(state, sideNavBar) {
    state.sideNavBar = sideNavBar
  },
  storePreviousRoute(state, previousRoute) {
    state.previousRoute = previousRoute
  },
  setSharedRoute(state, sharedRoute) {
    state.sharedRoute = sharedRoute
  }
}