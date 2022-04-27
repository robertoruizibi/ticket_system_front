<template src="assets/templates/components/navBar.html" />
<script>
import config from '~/config'
import routes from '~/config/routes'
import { mapGetters } from 'vuex'
import { logout } from '~/lib/api'


export default {
  data() {
    return {

    }
  },
  computed:{
    imageUrl() {
      const url = config.api.upload
      const api = config.apiURL
      return `${api}${url}/fotoPerfil/${this.loggedUser.imagen}?x-auth=${localStorage.getItem('token')}`
    },
    ...mapGetters({
      loggedUser: 'user/getUser'
    })
  },
  methods: {
    logout(){
      logout(this)
    }
  }
}
</script>