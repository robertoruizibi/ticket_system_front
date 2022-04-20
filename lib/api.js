import config from '~/config'
import { isObjEmpty } from '~/utils/common'
import get from 'lodash/get'

/** AUTH METHODS */
export const login = async ({ $axios, $store }, email, password) => {
  try {
    const url = config.api.login
    const api = config.apiURL
    const params = { email, password }
    const loginData = await $axios.post(`${api}${url}`, params)
    if (!isObjEmpty(get(loginData, 'data', {}))) {
      $store.commit('user/storeUser', get(loginData, 'data.user', {}))
      localStorage.setItem('token', get(loginData, 'data.token', ''))
    }
    return loginData
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

export const renoveToken = async ({ $axios, commit }) => {
  try {
    const url = config.api.auth
    const api = config.apiURL
    const renoveTokenData = await $axios.post(`${api}${url}`)
    if (!isObjEmpty(get(renoveTokenData, 'data', {}))) {
      commit('user/storeUser', get(renoveTokenData, 'data.user', {}))
      localStorage.setItem('token', get(renoveTokenData, 'data.token', ''))
    }
    return renoveTokenData
  } catch (e) {
    return { error: 'Token inválido' }
  }
}

/** USER METHODS */
export const getUsers = async ({ $axios, $store }, id = null) => {
  try {
    const url = config.api.users
    const api = config.apiURL
    const params = id
    const users = await $axios.get(`${api}${url}`, params)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

/** UPLOADS METHODS */
export const getFileData = async ({ $axios, $store }, type='fotoPerfil',nameFile='default-profile.jpg') => {
  try {
    const url = config.api.upload
    const api = config.apiURL
    const data = await $axios.get(`${api}${url}/${type}/${nameFile}`)
    return data
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}