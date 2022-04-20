import config from '~/config'
import { isObjEmpty } from '~/utils/common'
import { renoveToken } from '~/lib/api'
import axios from 'axios'

export default async function authMiddleware({store}) {
  await renoveToken(store)
}
