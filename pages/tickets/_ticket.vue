<template src="assets/templates/pages/tickets/_ticket.html" />

<script>
import get from 'lodash/get'
import config from '~/config'
import routes from '~/config/routes'
import ticketForm from '~/components/ticketForm'
import { checkRol } from '~/utils/common'
import { mapGetters, mapMutations } from 'vuex'
import { isObjEmpty, isValidPassword, isValidEmail } from '~/utils/common'
import { getTicketReports, getFileData, deleteReport, getTicket, getTicketDates, getUser, updateReport } from '~/lib/api'

export default {
  data() {
    return {
      ticketID: '',
      editMode: false,
      reports: [],
      ticket: {},
      responsable: {},

      reportToDelete: ''
    }
  },
  components: {
   ticketForm
  },
  computed: {
    userIsAdmin(){
      return this.loggedUser.rol === 'empresa'
    },
    ...mapGetters({
      loggedUser: 'user/getUser',
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  methods: {
    async changeViewed(){
      if (this.loggedUser.rol === 'cliente'){
        let reportsFiltered = this.reports.filter(report => report.visto === 0)
        reportsFiltered.forEach(async report => {
            let editReport = report
            editReport.visto = 1
            await updateReport(this, editReport.id_reporte, editReport)
        });
      }
    },
    reportViewed(viewed){
      return viewed ? 'Visto por cliente' : 'No visto por cliente'
    },
    addReport(){
      this.storePreviousRoute(`${this.$route.path}`)
      this.$router.push({ path: `${routes.reports}/?new=${this.ticketID}` })
    },
    getParsedDate(date){
      return new Date(date).toLocaleDateString('es-ES')
    },
    async getAllData(){
      await Promise.all([
        await this.getReports(),
        await this.getTicketData(),
        await this.getResponsable()
      ])
    },
    async getResponsable(){
      let response = await getUser(this, this.ticket.responsable)
      this.responsable = get(response, 'data.usuario', {})
    },
    async getTicketData(){
      let ticketData = await getTicket(this, this.ticketID)
      let ticket = get(ticketData, 'data.ticket', {})
      let dates = await this.getDates(get(ticket, 'id_ticket', null))
      ticket.dates = dates
      this.ticket = ticket
    },
    async getDates(id_ticket){
      let dates = await getTicketDates(this, id_ticket)
      return get(dates, 'data.date.fecha_creacion', '')
    },
    async makeFileUrl(){
      this.reports = await Promise.all(
        this.reports.map(async report => {
            const url = config.api.upload
            const api = config.apiURL
            return {
              url: `${api}${url}/ficheroReporte/${report.archivo_adjunto}?x-auth=${localStorage.getItem('token')}`,
              archivo_adjunto: report.archivo_adjunto,
              contenido: report.contenido,
              fecha_creacion: report.fecha_creacion,
              id_reporte: report.id_reporte,
              id_ticket: report.id_ticket,
              visto: report.visto
            }
          })
      )
    },
    async fillReports(){
      let reportsData = await getTicketReports(this, this.ticketID)
      this.reports = get(reportsData, 'data.reports', [])
    },
    editTicket(){
      this.editMode = true
    },
    detailsTicket(){
      this.editMode = false
    },
    reportsEditPath(id){
      this.$router.push({ path: `${routes.reports}/?edit=${id}` })
    },
    async deleteSingleReport(id){
      this.reportToDelete = id
    },

    async deleteReport(){
      await deleteReport(this, this.reportToDelete)
      await this.getReports()
    },

    async getReports(){
      await this.fillReports()
      await this.makeFileUrl()
    },
    returnRoute(){
      let route = '/tickets'
      this.$router.push({ path: route })
    },
    async shareTicket(){
      await navigator.share({url: `${window.location.href}?shared=true`})
    },
    ...mapMutations({
      storePreviousRoute: 'sideNavBar/storePreviousRoute'
    })
  },
  async mounted(){
    if (this.$route.query.edit) this.editMode = true  
    this.ticketID = this.$route.params.ticket
    await this.getAllData()
    await this.changeViewed()
  }
}
</script>