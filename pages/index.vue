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
      loginMessage: 'Usuario o contraseña incorrectos',
      rememberMe: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    checkRememberMeSubmit(){
     if (this.rememberMe) {
       localStorage.setItem('userRemember', this.email)
     } else {
       localStorage.setItem('userRemember', '')
     }
    },
    checkRememberMeOnLoad(){
      this.email = localStorage.getItem('userRemember')
      if (this.email !== ''){
        this.rememberMe = true
      }
    },
    async loginUser(){
      let response = await login(this, this.email, this.password)
      if (!isObjEmpty(get(response, 'error', {}))) {
        this.loginError = true
      }else {
        this.loginError = false
        if (get(response, 'data.user.rol', '') === 'empresa') {
          this.checkRememberMeSubmit()
          this.$router.push({ path: routes.users })
        }else {
          this.$router.push({ path: routes.tickets })
        }
      }
    }
  },
  mounted(){
    checkRolInLogin(this)
    this.checkRememberMeOnLoad()
  }
}
</script>

<style />