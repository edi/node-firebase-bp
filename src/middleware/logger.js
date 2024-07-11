import {Log} from '../utils/index.js'

// create logger
const log = new Log()

export default function(req, _, next) {

  let userId = 'guest',
		ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress

	// check for assumed user id (not validated)
	if (typeof req.headers.authorization === 'string') {

		const segments = req.headers.authorization.split('.', 3)

		try {
			const jwt = JSON.parse(Buffer.from(segments[1], 'base64').toString())
			userId = jwt.sub
		} catch (err) {
			// do nothing
		}

	}

	log(`[${req.method}] ${req.path}`, userId, ip, JSON.stringify(req.body))

	next()

}
