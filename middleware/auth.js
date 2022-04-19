import config from '~/config'
import { isObjEmpty } from '~/utils/common'
import { renoveToken } from '~/lib/api'
import axios from 'axios'

export default async function authMiddleware(ctx) {
  await renoveToken(ctx)
//   // Check if autologin
//   if (config.autologinUrls.indexOf(route.path) !== -1 && !isObjEmpty(store.getters['user/getUser'])) {
//     redirect(302, routes.accountDeliveries, route.query)
//   }
}
