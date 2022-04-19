<template src="assets/templates/index.html" />

<script>
import { login } from '~/lib/api'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async loginUser(){
      let response = await login(this, this.email, this.password)
    }
  }
}
</script>

<style />