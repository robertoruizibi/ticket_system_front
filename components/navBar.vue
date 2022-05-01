<template src="assets/templates/components/navBar.html" />
<script>
import config from '~/config'
import routes from '~/config/routes'
import { mapGetters, mapMutations } from 'vuex'
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
    routeTitle(){
      let title = ''
      let splitted = this.actualPath.split('/')
      if (`/${splitted[1]}` === routes.tickets) {title = 'Tickets'}
      else if (`/${splitted[1]}` === routes.reports) {title = 'Reporte'}
      else if (this.$route.query.profile) {title = 'Configuración'}
      else if (`/${splitted[1]}` === routes.users) {title = 'Usuarios'}
      else if (`/${splitted[1]}` === routes.contact) {title = 'Contacto'}
      return title
    },
    imageUrl() {
      const url = config.api.upload
      const api = config.apiURL
      return `${api}${url}/fotoPerfil/${this.loggedUser.image}?x-auth=${localStorage.getItem('token')}`
    },
    ...mapGetters({
      loggedUser: 'user/getUser',
      sideNavBarState: 'sideNavBar/getSideNavBar'
    })
  },
  methods: {
    changeSideNavBarState(){
      this.storeSideNavBar(!this.sideNavBarState)
    },
    logout(){
      logout(this)
    },
    redirectConfiguration(){
      let route = `${routes.users}/${this.loggedUser.id_usuario}?profile=true`

      if (this.actualPath !== route){
        this.$router.push({ path: route })
      }
    },
    ...mapMutations({
      storeSideNavBar: 'sideNavBar/storeSideNavBar'
    })
  }
}
</script>