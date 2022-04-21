<template src="assets/templates/pages/users/newUser.html" />

<script>
import userForm from '~/components/userForm'
import { checkRol } from '~/utils/common'

export default {
  components: {
   userForm
  },
  async mounted(){
    checkRol(this)
  }
}
</script>