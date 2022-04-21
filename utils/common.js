import routes from '~/config/routes'

export const isObjEmpty = (obj = {}) => Object.keys(obj).length === 0
export const isArrayEmpty = (array = []) => Array.isArray(array) && array.length === 0

export const checkRol = ({$store, $router}) => {
  if ($store.getters['user/getUser'].rol !== 'empresa') {
    $router.push({ path: routes.tickets })
  }
}

export const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
  const reAccents = /[À-ź]/
  const valid = re.test(email)
  const containsAccents = reAccents.test(email)
  return valid && !containsAccents && email.indexOf('@gmai.com') === -1
}

export const isValidPassword = (password1, password2) => {
  if (password1 === '' || password1 === undefined || password1 === null || password1.length < 8) return false
  if (password2 === '' || password2 === undefined || password2 === null || password2.length < 8) return false
  if (password1 !== password2) return false
  return true
}