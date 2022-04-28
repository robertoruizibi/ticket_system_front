<template src="assets/templates/pages/users/users.html" />

<script>
import routes from '~/config/routes'
import config from '~/config'
import get from 'lodash/get'
import { checkRol, loadChartData } from '~/utils/common'
import { mapGetters, mapMutations } from 'vuex'
import { deleteUser } from '~/lib/api'
import { isArrayEmpty } from '~/utils/common'
import { getUsers, getFileData } from '~/lib/api'


export default {
  data() {
    return {
      users: [],
      copyUsers: [],
      allUsers: [],
      filter: 'date&asc',
      desde: 0,
      maxUsers: 0,
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
      return Math.ceil(this.maxUsers / 10) 
    },
    ...mapGetters({
      user: 'user/getUser',
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  methods: {

    async changePage(pageIndex){
      this.desde = (pageIndex - 1) * 10
      this.checkFilter()
      this.storePreviousRoute(this.$route.path)
      this.$router.push({ path: `${routes.users}?desde=${this.desde}` })
      await this.checkDesdeSurpassedMaxUsers()
    },

    async checkDesdeSurpassedMaxUsers(){
      if (this.desde > this.maxUsers) {
        await this.getUsers('date', 'asc', 0)
        this.storePreviousRoute(this.$route.path)
        this.$router.push({ path: routes.users })
      }
    },

    async checkFilter(){
      let splitted = this.filter.split('&')
      if (splitted.length === 2){
        let typeOrder = splitted[0]
        let asc = splitted[1]
        await this.getUsers(typeOrder, asc, this.desde)
      }
    },

    createNewUser(){
      this.storePreviousRoute(this.$route.path)
      this.$router.push({ path: routes.newUser })
    },

    async deleteUser(id){
      await deleteUser(this, id)
      await this.getUsers()
    },

    async getUsers(typeOrder, asc, desde){
      let response = await getUsers(this, typeOrder, asc, desde)
      let usersResponse = get(response, 'data.usuarios', [])
      if (!isArrayEmpty(get(response, 'data.usuarios', []))){
        this.users = usersResponse
        this.copyUsers = usersResponse
        this.maxUsers = get(response, 'data.page.total', 0)
        this.allUsers = get(response, 'data.allUsers', [])
      }
    },

    getImage(image){
      // let imageData = await getFileData(this, 'fotoPerfil', image)
      const url = config.api.upload
      const api = config.apiURL
      const type = 'fotoPerfil'
      return `${api}${url}/${type}/${image}` + `?x-auth=${localStorage.getItem('token')}`
    },

    searchUser(){
      let email = this.allUsers.filter(user => user.email.includes(this.search))
      let name = this.allUsers.filter(user => user.nombre_organizacion.includes(this.search))
      if (email.length > 0) this.users = email
      if (name.length > 0) this.users = name
      if (name.length === 0 && email.length === 0) this.users = this.copyUsers
    },

    resetUser(){
      this.users = this.copyUsers
      this.search = ''
    },

    usersPath(id){
      return `${routes.users}/${id}`
    },

    ...mapMutations({
      storePreviousRoute: 'sideNavBar/storePreviousRoute'
    })
  },
  async mounted(){
    checkRol(this)
    this.desde = !isNaN(this.$route.query.desde) ? this.$route.query.desde : 0 
    await this.getUsers('date', 'asc', this.desde)
    this.checkDesdeSurpassedMaxUsers()
    loadChartData()
  }
}
</script>
