<template src="assets/templates/users/users.html" />

<script>
import { mapGetters } from 'vuex'
import routes from '~/config/routes'
import { checkRol } from '~/utils/common'
import { getUsers, getFileData } from '~/lib/api'
import { isArrayEmpty } from '~/utils/common'
import get from 'lodash/get'
import config from '~/config'


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
    async getUsers(){
      let response = await getUsers(this)
      let usersResponse = get(response, 'data.usuarios', [])
      console.log("🚀 ~ file: index.vue ~ line 26 ~ getUsers ~ usersResponse", usersResponse)
      if (!isArrayEmpty(get(response, 'data.usuarios', []))){
        console.log('está lleno');
        this.users = usersResponse
      }
    },

    getImage(image){
      // let imageData = await getFileData(this, 'fotoPerfil', image)
      const url = config.api.upload
      const api = config.apiURL
      const type = 'fotoPerfil'
      return `${api}${url}/${type}/${image}` + `?x-auth=${localStorage.getItem('token')}`
    }
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
