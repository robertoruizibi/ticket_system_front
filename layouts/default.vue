<template src="~/assets/templates/pages/default.html" />

<script>
import navBar from '~/components/navBar'
import sideNavBar from '~/components/sideNavBar'

import routes from '~/config/routes'
import { mapGetters } from 'vuex'
import { isObjEmpty } from '~/utils/common'

export default {
  watch: {
    getPreviousRoute(newVal, oldVal){
      console.log('newVal', newVal);
    }
  },
  component: {
    navBar,
    sideNavBar
  },
  computed:{
    hideSideNavBar(){
      return (this.$vssWidth < 767) ? this.sideNavBarState : false
    },
    isLoginPath(){
      return this.$route.path === routes.index
    },
    ...mapGetters({
      loggedUser: 'user/getUser',
      sideNavBarState: 'sideNavBar/getSideNavBar',
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  mounted(){
    if (isObjEmpty(this.loggedUser)) {
      this.$router.push({ path: routes.index })
    }
  }
}
</script>

<!-- <style  lang="scss" src="~/assets/styles/default.scss"> -->
