<template src="assets/templates/components/sideNavBar.html" />

<script>

import get from 'lodash/get'
import routes from '~/config/routes'
import { mapGetters, mapMutations } from 'vuex'
import { isObjEmpty } from '~/utils/common'

export default {
  data() {
    return {
      adminOptions: ['Usuarios', 'Tickets', 'Configuración', 'Política de privacidad'],
      normalUserOptions: ['Tickets', 'Configuración', 'Contacto', 'Política de privacidad'],
      actualOptions: []
    }
  },
  watch: {
    width(newVal, oldVal){
      if (newVal > 767) {
        this.storeSideNavBar = true
      }
    }
    
  },
  props:{
    hideSideNavBar:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    sideNavBar: {
      get() {
        return this.$store.getters['sideNavBar/getSideNavBar']
      },
      set(value) {
        this.$store.commit('sideNavBar/storeSideNavBar', value)
      }
    },
    width(){
      return this.$vssWidth
    },
    actualPath(){
      return this.$route.path
    },
    ...mapGetters({
      loggedUser: 'user/getUser'
    })
  },
  methods: {
    checkIcon(option){
      let icon = ''
      if (option === 'Tickets') {icon = 'fa-solid fa-clipboard-list' }
      else if (option === 'Usuarios') {icon = 'fa-solid fa-user'}
      else if (option === 'Configuración') {icon = 'fas fa-cog'}
      else if (option === 'Contacto') {icon = 'fa-solid fa-address-book'}
      // else if (option === 'Política de privacidad') {icon = 'fa-solid fa-file-contract'}
      return icon
    },
    checkSelected(option){
      let selected = false
      let splitted = this.actualPath.split('/')
      if (option === 'Tickets') {selected = `/${splitted[1]}` === routes.tickets || `/${splitted[1]}` === routes.reports}
      else if (option === 'Usuarios') {selected = `/${splitted[1]}` === routes.users && !this.$route.query.profile}
      else if (option === 'Configuración') {selected = this.$route.query.profile}
      else if (option === 'Contacto') {selected = `/${splitted[1]}` === routes.contact}
      else if (option === 'Política de privacidad') {selected = `/${splitted[1]}` === routes.privacityPolicity}
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
      let route = ''

      if (option === 'Tickets') {route = routes.tickets}
      else if (option === 'Usuarios') {this.checkUserType(); route = routes.users}
      else if (option === 'Configuración') {route = `${routes.users}/${this.loggedUser.id_usuario}?profile=true`}
      else if (option === 'Contacto') {route = routes.contact}
      else if (option === 'Política de privacidad') {route = routes.privacityPolicity}

      this.sideNavBar = true

      if (this.actualPath !== route){
        this.$router.push({ path: route })
      }
    },
    ...mapMutations({
      storeSideNavBar: 'sideNavBar/storeSideNavBar'
    })
  },
  mounted(){
    this.checkUserType()
  }
}
</script>

<style>

</style>