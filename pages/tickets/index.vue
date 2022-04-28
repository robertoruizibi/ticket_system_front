<template src="assets/templates/pages/tickets/tickets.html" />

<script>
import routes from '~/config/routes'
import config from '~/config'
import get from 'lodash/get'
import { checkRol, loadChartData } from '~/utils/common'
import { mapGetters, mapMutations } from 'vuex'
import { deleteUser } from '~/lib/api'
import { isArrayEmpty } from '~/utils/common'
import { getUserTickets, getTicketDates, deleteTicket } from '~/lib/api'

export default {
  data() {
    return {
      tickets: [],
      copyTickets: [],
      allTickets: [],
      filter: 'date&asc',
      desde: 0,
      maxTickets: 0,
      actualPage: 1,
      search: ''
    }
  },
  watch: {
    filter(newVal, oldVal){
      this.checkFilter(newVal)
    }
  },
  computed: {
    numPages(){
      return Math.ceil(this.maxTickets / 10) 
    },
    ...mapGetters({
      loggedUser: 'user/getUser',
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  methods: {
    async checkFilter(){
      let splitted = this.filter.split('&')
      if (splitted.length === 2){
        let typeOrder = splitted[0]
        let asc = splitted[1]
        await this.getUserTickets(typeOrder, asc, this.desde)
      }
    },

    async changePage(pageIndex){
      this.desde = (pageIndex - 1) * 10
      this.checkFilter()
      this.storePreviousRoute(this.$route.path)
      this.$router.push({ path: `${routes.tickets}?desde=${this.desde}` })
      await this.checkDesdeSurpassedMaxTickets()
    },

    async checkDesdeSurpassedMaxTickets(){
      if (this.desde > this.maxTickets) {
        await this.getUserTickets('date', 'asc', 0)
        this.storePreviousRoute(this.$route.path)
        this.$router.push({ path: routes.tickets })
      }
    },

    createNewTicket(){
      this.storePreviousRoute(this.$route.path)
      this.$router.push({ path: routes.newTicket })
    },

    async deleteTicket(id){
      await deleteTicket(this, id)
      await this.getUserTickets(this.loggedUser.id_usuario)
    },

    estado(enabled){
      return enabled ? 'Abierto' : 'Cerrado'
    },

    async getUserTickets(typeOrder, asc, desde){
      let response = await getUserTickets(this, this.loggedUser.id_usuario, typeOrder, asc, desde)
      let tickets = get(response, 'data.tickets', [])
      if (!isArrayEmpty(get(response, 'data.tickets', []))){
        this.tickets = tickets
        this.maxTickets = get(response, 'data.page.total', 0)
        this.allTickets = get(response, 'data.allTickets', [])
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
        this.allTickets = await Promise.all(
          this.allTickets.map(async ticket => {
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
        this.copyTickets = this.tickets
      }
    },

    async getDates(id_ticket){
      let dates = await getTicketDates(this, id_ticket)
      return get(dates, 'data.date.fecha_creacion', '')
    },

    getParsedDate(date){
      return new Date(date).toLocaleDateString('es-ES')
    },

    resetTicket(){
      this.tickets = this.copyTickets
      this.search = ''
    },

    searchTicket(){
      let title = this.allTickets.filter(ticket => {
        return ticket.titulo.includes(this.search)
      })
      if (title.length > 0) {
        this.tickets = title
      } else {
        this.tickets = this.copyTickets
      }
    },

    ticketsPath(id){
      this.storePreviousRoute(`${routes.tickets}/${id}`)
      this.$router.push({ path: `${routes.tickets}/${id}` })
    },

    ...mapMutations({
      storePreviousRoute: 'sideNavBar/storePreviousRoute'
    })
  },
  async mounted(){
    checkRol(this)
    this.desde = !isNaN(this.$route.query.desde) ? this.$route.query.desde : 0 
    await this.getUserTickets()
    this.checkDesdeSurpassedMaxTickets()
    loadChartData()
  }
}
</script>

<style>
