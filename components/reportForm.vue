<template src="assets/templates/components/reportForm.html" />

<script>
import get from 'lodash/get'
import config from '~/config'
import routes from '~/config/routes'
import { checkRol } from '~/utils/common'
import { mapGetters, mapMutations } from 'vuex'
import { isObjEmpty, isValidPassword, isValidEmail } from '~/utils/common'
import { createReport, uploadFile, getSingleReport, updateReport, deleteFile } from '~/lib/api'
export default {
  data() {
    return {
      // result variables
      createdSuccessfully: false,
      updatedSuccessfully: false,

      reportID: '',
      ticketID: '',
      contenido: '',
      file: '',
      report: {},
      fechaCreacion: new Date(),
      archivoAdjunto: '',
      visto: true,

      fileError: false,
      contenidoError: false,
      fileErrorMsg: 'No se pudo subir el archivo',
      contenidoErrorMsg: 'Debes escribir un reporte'
    }
  },
  computed:{
    // modal computed
    modalTitle(){
      return !this.isEditMode ? `¿Crear nuevo reporte?` : '¿Actualizar reporte?'
    },

    modalMessage(){
      return !this.isEditMode ? 'Selecciona "Aceptar" si realmente deseas crear este reporte' : `Selecciona "Aceptar" si realmente deseas actualizar este reporte`
    },

    // others
    title(){
      return this.isEditMode ? 'Editar reporte' : 'Crear reporte'
    },
    fileName(){
      if (this.archivoAdjunto) return this.archivoAdjunto
      return this.file.name ? this.file.name : 'Selecciona fichero'
    },
    isEditMode(){
      return this.$route.query.edit !== undefined
    },
    isNewReportMode(){
      return this.$route.query.new !== undefined
    },
    ...mapGetters({
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  methods:{
    checkContenido(){
      if (this.contenido === '') {
        this.contenidoError = true
      } else {
        this.contenidoError = false
      }
    },

    async fillInitialValues(){
      let reportData = await getSingleReport(this, this.reportID)
      if (get(reportData, 'data.report.id_reporte', null)) {
        this.contenido = get(reportData, 'data.report.contenido', '')
        this.fechaCreacion = get(reportData, 'data.report.fecha_creacion', '')
        this.archivoAdjunto = get(reportData, 'data.report.archivo_adjunto', '')
        this.visto = get(reportData, 'data.report.visto', true)
        this.ticketID = get(reportData, 'data.report.id_ticket', '')
      }
    },

    loadFile(e){
      this.file = e.target.files[0]
    },

    async uploadFile(id_reporte){
      const fd = new FormData()
      fd.append('archivo', this.file)
      
      let data = await uploadFile(this, 'ficheroReporte', id_reporte, fd)
      if (data.error){
        this.fileError = true
      } else {
        this.fileError = false
      }
    },

    async submitForm() {
      this.checkContenido()
      if (this.contenidoError) return;
      if (this.isEditMode) {
        this.report = {
          contenido: this.contenido,
          fecha_creacion: this.fechaCreacion,
          visto: this.visto,
          id_ticket: this.ticketID
        }
        let reportData = await updateReport(this, this.reportID, this.report)
        if (this.file !== '' && get(reportData, 'data.report.id_reporte', null)){
          this.uploadFile(this.reportID)
        }
        if (this.file === '' && this.archivoAdjunto === '') {
          await deleteFile(this, 'ficheroReporte', this.archivoAdjunto)
        }
        if (reportData.status && reportData.status === 200) this.updatedSuccessfully = true
      } else {
        this.report = {
          contenido: this.contenido,
          fecha_creacion: this.fechaCreacion,
          visto: this.visto,
          id_ticket: this.ticketID
        }
        let reportData = await createReport(this, this.report)
        if (this.file !== '' && get(reportData, 'data.report.id_reporte', null)){
          this.uploadFile(reportData.data.report.id_reporte)
        }
        if (reportData.status && reportData.status === 200) this.createdSuccessfully = true
      }
    },
    returnRoute(){
      let route = '/tickets'
      if (this.getPreviousRoute !== ''){
        route = this.getPreviousRoute
      }else {
        route = `/tickets/${this.ticketID}`
      }
      this.$router.push({ path: route })
    },
    ...mapMutations({
      storePreviousRoute: 'sideNavBar/storePreviousRoute'
    })
  },
  async mounted() {
    if ((!this.isEditMode && !this.isNewReportMode)) {
      this.storePreviousRoute(this.$route.path)
      this.$router.push({ path: routes.tickets })
    }
    if (this.isEditMode){
      if (isNaN(this.$route.query.edit)) {
        this.storePreviousRoute(this.$route.path)
        this.$router.push({ path: routes.tickets })
      }
      this.reportID = this.$route.query.edit
      await this.fillInitialValues()
    }
    else {
      if (isNaN(this.$route.query.new)) {
        this.storePreviousRoute(this.$route.path)
        this.$router.push({ path: routes.tickets })
      }
      this.ticketID = this.$route.query.new
    }
  },
}
</script>

<style>

</style>