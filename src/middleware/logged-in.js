import {auth} from '../utils/firebase.js'

/**
 * Check if user is authenticated
 */
export const isLoggedIn = async (req, res, next) => {

	let claims, idToken = req.headers.authorization

	try {
		claims = await auth.verifyIdToken(idToken)
	} catch (err) {
		return res.json({error: 'unauthorized_request'})
	}

	// save user details
	res.locals.uid = claims.uid
  res.locals.type = claims.type
	res.locals.language = claims.lang || process.env.DEFAULT_LANGUAGE

	next()

}

/**
 * Check if user has manager access
 */
export const isManager = async (req, res, next) => {

	if (res.locals.type !== 'manager')
		return res.json({error: 'unauthorized_request'})

	next()

}