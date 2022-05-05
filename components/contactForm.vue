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
      emailSended: false,
      errorEmail: false
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
        // Email y nombre del usuario que envía el correo
        this.email = this.loggedUser.email
        this.name = this.loggedUser.nombre_organizacion

        // Método propio de emailjs que envía el correo sirviéndose de service_is, template_id y account_id
        emailjs.send(config.service_id,config.template_id,{
          to_name: this.to_name,
          from_name: this.name,
          from_email: this.email,
          message: this.message,
        }, config.account_id);

        // Establecemos el flag emailSended a true para mostar al cliente que su mensaje ha sido enviado
        this.emailSended = true

        // Hacemos reset del mensaje una vez se ha enviado
        this.message = ''
      } catch (error) {
        // Si hay algún error se pone el flag errorEmail a true para mostrar al usuario que ha habido un error
        this.errorEmail = true
      }
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