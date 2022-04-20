<template src="assets/templates/index.html" />

<script>
import { login } from '~/lib/api'
import { mapGetters } from 'vuex'
import get from 'lodash/get'
import { isObjEmpty } from '~/utils/common'
import routes from '~/config/routes'

export default {
  data() {
    return {
      email: '',
      password: '',
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
        console.log('ha habido un error en login');
      }else {
        console.log('login correcto, redirijo');
        if (get(response, 'data.user.rol', '') === 'empresa') {
          console.log('push a routes.users', routes.users);
          this.$router.push({ path: routes.users })
        }else {
          console.log('redirijo a tickets');
        }
      }
    }
  },
}
</script>

<style />