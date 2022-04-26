<template src="assets/templates/components/sideNavBar.html" />

<script>

import get from 'lodash/get'
import routes from '~/config/routes'
import { mapGetters } from 'vuex'
import { isObjEmpty } from '~/utils/common'

export default {
  data() {
    return {
      adminOptions: ['Tickets', 'Usuarios', 'Configuración', 'Contacto'],
      normalUserOptions: ['Tickets', 'Configuración', 'Contacto'],
      actualOptions: []
    }
  },
  computed:{
    actualPath(){
      return this.$route.path
    },
    ...mapGetters({
      loggedUser: 'user/getUser'
    })
  },
  methods: {
    checkSelected(option){
      let selected = false
      let splitted = this.actualPath.split('/')
      if (option === 'Tickets') {selected = `/${splitted[1]}` === routes.tickets || `/${splitted[1]}` === routes.reports}
      else if (option === 'Usuarios') {selected = `/${splitted[1]}` === routes.users && !this.$route.query.profile}
      else if (option === 'Configuración') {selected = this.$route.query.profile}
      else if (option === 'Contacto') {selected = `/${splitted[1]}` === routes.contact}
      return selected
    },
    checkUserType() {
      let rol = get(this.loggedUser, 'rol', '')
      if (rol === 'empresa') {
        this.actualOptions = this.adminOptions
      } else if (rol === 'cliente') {
        this.actualOptions = this.normalUserOptions
      } else {
        this.$router.push({ path: routes.index })
      }
    },
    redirectToOption(option){
      console.log("🚀 ~ file: sideNavBar.vue ~ line 38 ~ redirectToOption ~ option", option)
      let route = ''

      if (option === 'Tickets') {route = routes.tickets}
      else if (option === 'Usuarios') {this.checkUserType(); route = routes.users}
      else if (option === 'Configuración') {route = `${routes.users}/${this.loggedUser.id_usuario}?profile=true`}
      else if (option === 'Contacto') {route = routes.contact}

      console.log('route', route);

      if (this.actualPath !== route){
        this.$router.push({ path: route })
      }
    }
  },
  mounted(){
    this.checkUserType()
  }
}
</script>

<style>

</style>