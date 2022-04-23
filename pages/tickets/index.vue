<template src="assets/templates/pages/tickets/tickets.html" />

<script>
import routes from '~/config/routes'
import config from '~/config'
import get from 'lodash/get'
import { checkRol } from '~/utils/common'
import { mapGetters } from 'vuex'
import { deleteUser } from '~/lib/api'
import { isArrayEmpty } from '~/utils/common'
import { getUserTickets, getTicketDates, deleteTicket } from '~/lib/api'

export default {
  data() {
    return {
      tickets: []
    }
  },
  computed: {
    ...mapGetters({
      loggedUser: 'user/getUser'
    })
  },
  methods: {
    createNewTicket(){
      this.$router.push({ path: routes.newTicket })
    },

    async deleteTicket(id){
      await deleteTicket(this, id)
      await this.getUserTickets(this.loggedUser.id_usuario)
    },

    estado(enabled){
      return enabled ? 'Abierto' : 'Cerrado'
    },

    async getUserTickets(){
      let response = await getUserTickets(this, this.loggedUser.id_usuario)
      let tickets = get(response, 'data.tickets', [])
      if (!isArrayEmpty(get(response, 'data.tickets', []))){
        this.tickets = tickets
        this.tickets = await Promise.all(
          this.tickets.map(async ticket => {
            let dates = await this.getDates(ticket.id_ticket)
            return {
              cliente: ticket.cliente,
              enabled: ticket.enabled,
              id_ticket: ticket.id_ticket,
              prioridad: ticket.prioridad,
              responsable: ticket.responsable,
              titulo: ticket.titulo,
              dates: dates
            }
          })
        )
        console.log('this.tickets', this.tickets);
      }
    },

    async getDates(id_ticket){
      let dates = await getTicketDates(this, id_ticket)
      return get(dates, 'data.date.fecha_creacion', '')
    },

    getParsedDate(date){
      return new Date(date).toLocaleDateString('es-ES')
    },

    ticketsPath(id){
      return `${routes.tickets}/${id}`
    },
  },
  async mounted(){
    console.log('this.loggedUser', this.loggedUser);
    checkRol(this)
    await this.getUserTickets()
  }
}
</script>

<style>
