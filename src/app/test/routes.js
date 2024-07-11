import * as controllers from './controllers.js'
import {Router} from 'express'

const router = Router()
router.get('/test', controllers.test)
export default router