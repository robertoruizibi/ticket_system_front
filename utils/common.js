import routes from '~/config/routes'

export const isObjEmpty = (obj = {}) => Object.keys(obj).length === 0
export const isArrayEmpty = (array = []) => Array.isArray(array) && array.length === 0

export const checkRol = ({$store, $router}) => {
  if ($store.getters['user/getUser'].rol !== 'empresa') {
    $router.push({ path: routes.tickets })
  }
}