<template src="assets/templates/pages/tickets/_ticket.html" />

<script>
import get from 'lodash/get'
import config from '~/config'
import routes from '~/config/routes'
import ticketForm from '~/components/ticketForm'
import { checkRol } from '~/utils/common'
import { mapGetters, mapMutations } from 'vuex'
import { isObjEmpty, isValidPassword, isValidEmail } from '~/utils/common'
import { getTicketReports, getFileData, deleteReport } from '~/lib/api'

export default {
  data() {
    return {
      ticketID: '',
      editMode: false,
      reports: []
    }
  },
  components: {
   ticketForm
  },
  computed: {
    ...mapGetters({
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  methods: {
    addReport(){
      this.storePreviousRoute(`${this.$route.path}/${this.ticketID}`)
      this.$router.push({ path: `${routes.reports}/?new=${this.ticketID}` })
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
      return `${routes.reports}/?edit=${id}`
    },
    async deleteSingleReport(id){
      await deleteReport(this, id)
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
    ...mapMutations({
      storePreviousRoute: 'sideNavBar/storePreviousRoute'
    })
  },
  async mounted(){
    if (this.$route.query.edit) this.editMode = true  
    this.ticketID = this.$route.params.ticket
    await this.getReports()  
  }
}
</script>