// File to manage SIDENAVBAR states
export const state = () => ({
  sideNavBar: true,
  previousRoute: ''
})

export const getters = {
  getSideNavBar: state => {
    return state.sideNavBar
  },
  getPreviousRoute: state => {
    return state.previousRoute
  }
}
export const mutations = {
  storeSideNavBar(state, sideNavBar) {
    state.sideNavBar = sideNavBar
  },
  storePreviousRoute(state, previousRoute) {
    state.previousRoute = previousRoute
  }
}