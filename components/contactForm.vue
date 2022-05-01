<template src="assets/templates/components/contactForm.html" />

<script>
import config from '~/config'
import emailjs from 'emailjs-com';
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      title: 'Formulario de contacto',
      name: '',
      email: '',
      message: '',
      to_name: 'empresa@gmail.com',
      reportSended: false
    }
  },
  computed: {
    ...mapGetters({
      loggedUser: 'user/getUser'
    })
  },
  methods: {
    sendEmail(e) {
      try {
        this.email = this.loggedUser.email
        this.name = this.loggedUser.nombre_organizacion
        emailjs.send(config.service_id,config.template_id,{
          to_name: this.to_name,
          from_name: this.name,
          from_email: this.email,
          message: this.message,
        }, config.account_id);
        this.reportSended = true
      } catch (error) {
        // console.log({error})
      }
      // Reset form field
      this.message = ''
    },
  },
  mounted(){
    this.email = this.loggedUser.email
    this.name = this.loggedUser.nombre_organizacion
  }
}
</script>

<style>

</style>