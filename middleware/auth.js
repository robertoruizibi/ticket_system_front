import config from '~/config'
import { isObjEmpty } from '~/utils/common'
import { renoveToken } from '~/lib/api'
import axios from 'axios'
import routes from '~/config/routes'

export default async function authMiddleware({store, route}) {
  let data = await renoveToken(store)
  if (data.error && route.path !== routes.index){
    store.$router.push({ path: routes.index })
  }
  if (route.query.shared) {
    store.commit('sideNavBar/setSharedRoute', route.fullPath)
  }
}
