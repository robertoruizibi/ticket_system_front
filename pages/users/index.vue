<template src="assets/templates/pages/users/users.html" />

<script>
import routes from '~/config/routes'
import config from '~/config'
import get from 'lodash/get'
import { checkRol } from '~/utils/common'
import { mapGetters } from 'vuex'
import { deleteUser } from '~/lib/api'
import { isArrayEmpty } from '~/utils/common'
import { getUsers, getFileData } from '~/lib/api'


export default {
  data() {
    return {
      users: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {

    createNewUser(){
      this.$router.push({ path: routes.newUser })
    },

    async deleteUser(id){
      await deleteUser(this, id)
      await this.getUsers()
    },

    async getUsers(){
      let response = await getUsers(this)
      let usersResponse = get(response, 'data.usuarios', [])
      if (!isArrayEmpty(get(response, 'data.usuarios', []))){
        this.users = usersResponse
      }
    },

    getImage(image){
      // let imageData = await getFileData(this, 'fotoPerfil', image)
      const url = config.api.upload
      const api = config.apiURL
      const type = 'fotoPerfil'
      return `${api}${url}/${type}/${image}` + `?x-auth=${localStorage.getItem('token')}`
    },

    usersPath(id){
      return `${routes.users}/${id}`
    },
  },
  async mounted(){
    checkRol(this)
    await this.getUsers()
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
