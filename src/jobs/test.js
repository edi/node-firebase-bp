import {Log, sleep} from '#utils/index.js'

export const forceRun = true
export const timing = '0 0 * * *' // every midnight

/**
 * Podcasts metadata fetching
 */
export default async () => {

	const log = new Log('TEST_JOB'), startTime = Date.now()

  log ('Started')

  // wait a while
  await sleep(3)

	log(`Finished (${(Date.now() - startTime)/1000}s)`)

}