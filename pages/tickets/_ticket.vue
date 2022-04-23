<template src="assets/templates/pages/tickets/_ticket.html" />

<script>
import { checkRol } from '~/utils/common'
import ticketForm from '~/components/ticketForm'

export default {
  data() {
    return {
      editMode: false
    }
  },
  components: {
   ticketForm
  },
  methods: {
    editTicket(){
      this.editMode = true
    },
    detailsTicket(){
      this.editMode = false
    }
  }
}
</script>