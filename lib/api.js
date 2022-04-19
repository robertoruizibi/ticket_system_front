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
      // $store.commit('user/storeUser', loginData.data.data)
      localStorage.setItem('token', get(loginData, 'data.token', ''))
    }
    return loginData
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}

export const renoveToken = async ({ $axios }) => {
  try {
    const url = config.api.auth
    const api = config.apiURL
    const renoveTokenData = await $axios.post(`${api}${url}`)
    if (!isObjEmpty(get(renoveTokenData, 'data', {}))) {
      // $store.commit('user/storeUser', renoveTokenData.data.data)
      localStorage.setItem('token', get(renoveTokenData, 'data.token', ''))
    }
    return renoveTokenData
  } catch (e) {
    return { error: 'Datos de acceso incorrectos' }
  }
}