<template src="~/assets/templates/pages/default.html" />

<script>
import navBar from '~/components/navBar'
import sideNavBar from '~/components/sideNavBar'

import routes from '~/config/routes'
import { mapGetters } from 'vuex'
import { isObjEmpty } from '~/utils/common'

export default {
  component: {
    navBar,
    sideNavBar
  },
  computed:{
    isLoginPath(){
      return this.$route.path === routes.index
    },
    ...mapGetters({
      loggedUser: 'user/getUser'
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
