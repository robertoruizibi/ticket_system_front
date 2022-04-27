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
    actualPath(){
      return this.$route.path
    },
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
    },
    redirectConfiguration(){
      let route = `${routes.users}/${this.loggedUser.id_usuario}?profile=true`

      if (this.actualPath !== route){
        this.$router.push({ path: route })
      }
    }
  }
}
</script>