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

export const getUser = async ({ $axios, $store }, id = null) => {
  try {
    const url = config.api.users
    const api = config.apiURL
    const params = id
    const users = await $axios.get(`${api}${url}/${id}`)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

export const createUser = async ({ $axios, $store }, params) => {
  try {
    const url = config.api.users
    const api = config.apiURL
    const users = await $axios.post(`${api}${url}`, params)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

export const updateUser = async ({ $axios, $store }, id, params) => {
  try {
    const url = config.api.users
    const api = config.apiURL
    const users = await $axios.put(`${api}${url}/${id}`, params)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

export const deleteUser = async ({ $axios, $store }, id) => {
  try {
    const url = config.api.users
    const api = config.apiURL
    const users = await $axios.delete(`${api}${url}/${id}`)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

export const updatePassword = async ({ $axios, $store }, id, params) => {
  try {
    const url = config.api.password
    const api = config.apiURL
    const users = await $axios.put(`${api}${url}/${id}`, params)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

/** TICKETS METHODS */
export const getUserTickets = async ({ $axios, $store }, id = null) => {
  try {
    const url = config.api.userTickets
    const api = config.apiURL
    const users = await $axios.get(`${api}${url}/${id}`)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

export const deleteTicket = async ({ $axios, $store }, id) => {
  try {
    const url = config.api.tickets
    const api = config.apiURL
    const users = await $axios.delete(`${api}${url}/${id}`)
    return users
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

/** DATES METHODS */
export const getTicketDates = async ({ $axios, $store }, id = null) => {
  try {
    const url = config.api.dates
    const api = config.apiURL
    const users = await $axios.get(`${api}${url}/${id}`)
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

export const uploadFile = async ({ $axios, $store }, type='fotoPerfil', id, params) => {
  try {
    const url = config.api.upload
    const api = config.apiURL
    const data = await $axios.post(`${api}${url}/${type}/${id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
    return data
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}