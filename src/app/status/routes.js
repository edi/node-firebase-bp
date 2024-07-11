import * as controllers from './controllers.js'
import {Router} from 'express'

const router = Router()
router.post('/status/auth',     controllers.hasAuth)
router.post('/status/storage',  controllers.hasStorage)
router.post('/status/database', controllers.hasDatabase)
export default router