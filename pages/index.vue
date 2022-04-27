<template src="assets/templates/pages/index.html" />

<script>
import { login } from '~/lib/api'
import { mapGetters } from 'vuex'
import get from 'lodash/get'
import { isObjEmpty, checkRolInLogin } from '~/utils/common'
import routes from '~/config/routes'

export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
      loginMessage: 'Usuario o contraseña incorrectos'
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    async loginUser(){
      let response = await login(this, this.email, this.password)
      if (!isObjEmpty(get(response, 'error', {}))) {
        this.loginError = true
      }else {
        this.loginError = false
        if (get(response, 'data.user.rol', '') === 'empresa') {
          this.$router.push({ path: routes.users })
        }else {
          this.$router.push({ path: routes.tickets })
        }
      }
    }
  },
  mounted(){
    checkRolInLogin(this)
  }
}
</script>

<style />