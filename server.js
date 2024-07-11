import 'dotenv/config'

import errorHandler from '#middleware/error-handler.js'
import validJson from '#middleware/valid-json.js'
import logger from '#middleware/logger.js'
import {schedule} from '#utils/index.js'
import routes from '#config/routes.js'
import jobs from '#config/jobs.js'
import express from 'express'
import cors from 'cors'

/* HTTP CLIENT */
const app = express()

/* MIDDLEWARE */
app.use(express.json({limit: '5mb'}))
app.use(cors())
app.use(logger)
app.use(validJson)

/* STATIC FILES */
app.use('/assets', express.static('assets'))

/* VIEW ENGINE */
app.set('view engine', 'hbs')
app.set('views', './src/views')

/* APPLY ROUTES */
routes.forEach(route => app.use('/', route))

/* ERROR HANDLING */
app.use(errorHandler)

// catch-all
app.all('*', (_, res) => res.json({error: 'forbidden_method'}))

// start
app.listen(8080, async () => {

  console.log('[API] Started')

  /* TRIGGER JOBS */
  jobs.forEach(job => schedule.apply(this, job))

})