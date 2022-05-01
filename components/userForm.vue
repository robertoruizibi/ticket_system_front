<template src="assets/templates/components/userForm.html" />

<script>
import get from 'lodash/get'
import config from '~/config'
import routes from '~/config/routes'
import { checkRol } from '~/utils/common'
import { mapGetters, mapMutations } from 'vuex'
import { isObjEmpty, isValidPassword, isValidEmail } from '~/utils/common'
import { getUser, createUser, updateUser, updatePassword, uploadFile } from '~/lib/api'

export default {
  data() {
    return {
      // result variables
      createdSuccessfully: false,
      updatedSuccessfully: false,

      // update user fields
      user: {},
      name: '',
      email: '',
      password1: '',
      password2: '',
      enabled: false,
      image: '',
      imageUrl: '',

      // error variables
      nameError: false,
      emailError: false,
      passwordError: false,
      imageError: false,
      userExistsError: false,
      nameErrorMsg: 'El nombre de organización es obligatorio',
      emailErrorMsg: 'El email no es correcto',
      passwordErrorMsg: 'Las contraseñas no coinciden o no tienen mínimo 8 carácteres',
      imageErrorMsg: 'Ha habido un error al actualizar la imagen',
      userExistsErrorMsg: 'El usuario ya existe',
    }
  },
  computed: {

    // modal computed
    modalTitle(){
      if (this.isProfile) return '¿Actualizar perfil?'
      return this.isNewUserMode ? `¿Crear nuevo usuario ${this.email}?` : `¿Actualizar ${this.user.email}?`
    },

    modalMessage(){
      if (this.isProfile) return 'Selecciona "Aceptar" si realmente deseas actualizar tu perfil'
      return this.isNewUserMode ? 'Selecciona "Aceptar" si realmente deseas crear este usuario' : `Selecciona "Aceptar" si realmente deseas actualizar ${this.user.email}`
    },

    // new user computeds
    isAdminUser(){
      return get(this.userLogged, 'rol', '') === 'empresa' || this.isNewUserMode 
    },

    isProfile(){
      return this.$route.query.profile
    },


    // edit user computeds
    title(){
      if (this.isProfile) return 'Actualizar perfil'
      return this.isNewUserMode ? 'Crear nuevo usuario' : `Actualizar ${this.user.email}`
    },

    imageName(){
      return this.image.name ? this.image.name : 'Selecciona imagen'
    },

    userState(){
      return this.enabled ? 'Habilitado' : 'Deshabilitado'
    },

    isNewUserMode(){
      return this.$route.path === routes.newUser
    },
    ...mapGetters({
      userLogged: 'user/getUser',
      getPreviousRoute: 'sideNavBar/getPreviousRoute'
    })
  },
  methods: {

    checkUserProfileUpdateAvaliability(){
      if (this.$route.params.users !== this.userLogged.id_usuario.toString()) {
        this.storePreviousRoute(this.$route.path)
        this.$router.push({ path: routes.tickets })
      }
    },

    // common methods

    checkName(){
      if (this.name === ''){
        this.nameError = true
      } else {
        this.nameError = false
      }
    },

    checkEmail(){
      if (!isValidEmail(this.email)) {
        this.emailError = true
      } else {
        this.emailError = false
      }
    },

    checkPassword(){
      if (!isValidPassword(this.password1, this.password2)) {
        this.passwordError = true
      }else {
        this.passwordError = false
      }
    },

    async submitForm(){

      // si es modo crear usuario
      if (this.isNewUserMode) {
        this.checkName()
        this.checkEmail()
        this.checkPassword()
        let newUser = {
          nombre_organizacion: this.name,
          email: this.email,
          password: this.password1,
          enabled: this.enabled
        }
        
        if (!this.nameError && !this.emailError && !this.passwordError) {
          let userData = await createUser(this, newUser)
          if (userData.error){
            this.userExistsError = true
          }

          if (this.image !== '' && get(userData, 'data.usuario.id_usuario', null)){
            this.uploadImage(userData.data.usuario.id_usuario)
          }

          if (userData.status && userData.status === 200) this.updatedSuccessfully = true
        }
      } else {
        // si es modo edicion

        // Si el usuario es admin se actualizan todos los campos
        if (this.isAdminUser) {
          this.checkName()
          this.checkEmail()
          let id = get(this.$route.params, 'users', null)
          let data = {
            nombre_organizacion: this.name,
            email: this.email,
            enabled: this.enabled
          }
          if (!this.nameError && !this.emailError) {
            let userData = await updateUser(this, id, data)
            if (isValidPassword(this.password1, this.password2)){
              await updatePassword(this, id, {password: this.password1})
            }
            if (this.image !== ''){
              let id = get(this.$route.params, 'users', null)
              this.uploadImage(id)
            }

            if (userData.status && userData.status === 200) this.updatedSuccessfully = true
          }
          
        } else {
          // Si el usuario es cliente solo se actualiza contrasena
          let id = get(this.$route.params, 'users', null)
          if (isValidPassword(this.password1, this.password2)){
            await updatePassword(this, id, {password: this.password1})
          }
        }
      }
    },

    loadImage(e) {
      this.image = e.target.files[0]
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      
    },

    returnRoute(){
      let route = '/users'
      if (this.getPreviousRoute !== ''){
        route = this.getPreviousRoute
      }
      this.$router.push({ path: route })
    },

    async createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = async (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    async uploadImage(id){
      const fd = new FormData()
      fd.append('archivo', this.image)
      
      let data = await uploadFile(this, 'fotoPerfil', id, fd)
      if (data.error){
        this.imageError = true
      } else {
        if (id === this.userLogged.id_usuario.toString()) {
          const navBarImg = document.getElementById('navBarImg');
          navBarImg.src = this.imageUrl
        }
        this.imageError = false
      }
    },

    // update user methods

    async getUser(){
      let response = await getUser(this, get(this.$route.params, 'users', null))
      let userResponse = get(response, 'data.usuario', {})
      if (!isObjEmpty(get(response, 'data.usuario', {}))){
        this.user = userResponse
      }
    },

    loadInitialValues(){
      if (!isObjEmpty(this.user)) {
        this.name = this.user.nombre_organizacion
        this.email = this.user.email
        this.enabled = this.user.enabled
      }
    },

    loadImageUrl() {
      const url = config.api.upload
      const api = config.apiURL
      this.imageUrl =  `${api}${url}/fotoPerfil/${this.user.image}?x-auth=${localStorage.getItem('token')}`
    },

    loadProfileImageUrl(){
      const url = config.api.upload
      const api = config.apiURL
      this.imageUrl =  `${api}${url}/fotoPerfil/${this.userLogged.image}?x-auth=${localStorage.getItem('token')}`
    },

    ...mapMutations({
      storePreviousRoute: 'sideNavBar/storePreviousRoute'
    })
  },

  async mounted(){
    if (this.isProfile) {
      this.checkUserProfileUpdateAvaliability()
      this.loadProfileImageUrl()
    } else { 
      checkRol(this) 
    }
    if (!this.isNewUserMode){
      await this.getUser()
      this.loadInitialValues()
      this.loadImageUrl()
    }else {
      this.enabled = true
    }
    
  }
}
</script>
