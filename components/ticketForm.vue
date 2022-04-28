<template src="assets/templates/components/ticketForm.html" />

<script>
import get from 'lodash/get'
import routes from '~/config/routes'
import { checkRol } from '~/utils/common'
import { mapGetters, mapMutations } from 'vuex'
import { isObjEmpty } from '~/utils/common'
import { getUsers, updateTicket, getTicket, createTicket, createTicketDate } from '~/lib/api'

export default {
  data() {
    return {
      // users
      usuariosResponsable: [],
      usuariosCliente: [],

      // ticket user fields
      ticket: {},
      titulo: '',
      prioridad: '',
      enabled: true,
      responsable: '',
      cliente: '',

      tiposPrioridad: ['Alta', 'Media', 'Baja'],

      // error variables
      tituloError: false,
      tituloMaxCar: false,
      prioridadError: false,
      responsableError: false,
      clienteError: false,
      tituloErrorMsg: 'El titulo de organización es obligatorio',
      tituloMaxCarMsg: 'El título debe tener como máximo 30 caracteres',
      prioridadErrorMsg: 'La prioridad es obligatoria',
      responsableErrorMsg: 'El responsable es obligatorio',
      clienteErrorMsg: 'El cliente es obligatorio',
    }
  },
  computed: {
    ticketState(){
      return this.enabled ? 'Abierto' : 'Cerrado'
    },
    title(){
      return this.isNewTicketMode ? 'Crear nuevo ticket' : 'Actualizar ticket'
    },
    isNewTicketMode(){
      return this.$route.path === routes.newTicket
    },
    ...mapGetters({
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  methods: {
    checkTituloMaxCar(){
       if (this.titulo.length > 30){
        this.tituloMaxCar = true
      } else {
        this.tituloMaxCar = false
      }
    },
    checkResponsable(){
      if (this.responsable === '') {
        this.responsableError = true
      } else {
        this.responsableError = false
      }
    },
    checkCliente(){
      if (this.cliente === '') {
        this.clienteError = true
      } else {
        this.clienteError = false
      }
    },
    checkPrioridad(){
      if (this.tiposPrioridad.includes(this.prioridad)) {
        this.prioridadError = false
      } else {
        this.prioridadError = true
      }
    },
    checkTitle(){
      if (this.titulo === ''){
        this.tituloError = true
      } else {
        this.tituloError = false
      }
      this.checkTituloMaxCar()
    },
    checkValues(){
      this.checkTitle()
      this.checkPrioridad()
      this.checkResponsable()
      this.checkCliente()
    },
    async fillUsers(){
      let usersData = await getUsers(this)
      let users = get(usersData, 'data.usuarios', [])
      this.usuariosResponsable = users.filter(user => user.rol === 'empresa' && user.enabled)
      this.usuariosCliente = users.filter(user => user.rol === 'cliente' && user.enabled)
      this.usuariosCliente = this.usuariosCliente.reverse()
    },
    async fillInitialTicketData(){
      let id = get(this.$route.params, 'ticket', null)
      let ticketData = await getTicket(this, id)
      let ticket = get(ticketData, 'data.ticket', null)
      this.prioridad = ticket.prioridad
      this.enabled = ticket.enabled
      this.responsable = ticket.responsable
      this.cliente = ticket.cliente
      this.titulo = ticket.titulo
    },
    async submitForm() {
      this.checkValues()
      if(this.tituloError || this.prioridadError || this.responsableError || this.clienteError) return false
      this.ticket = {
        prioridad: this.prioridad,
        responsable: this.responsable,
        cliente: this.cliente,
        titulo: this.titulo,
        enabled: this.enabled
      }
      if (this.isNewTicketMode) {
        let ticketData = await createTicket(this, this.ticket)
        if (!isObjEmpty(get(ticketData, 'data', {}))) {
          let date = {
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date(),
            ultima_fecha_consulta_cliente: null,
            id_ticket: ticketData.data.ticket.id_ticket
          }
          await createTicketDate(this, date)
        }
      } else {
        let id = get(this.$route.params, 'ticket', null)
        await updateTicket(this, id, this.ticket)
      }
    },
    returnRoute(){
      let route = '/tickets'
      if (this.getPreviousRoute !== ''){
        route = this.getPreviousRoute
      }
      this.$router.push({ path: route })
    },
    ...mapMutations({
      storePreviousRoute: 'sideNavBar/storePreviousRoute'
    })
  },
  async mounted(){
    checkRol(this)
    await this.fillUsers()
    if (!this.isNewTicketMode) {
      this.fillInitialTicketData()
    }
  }
}
</script>
