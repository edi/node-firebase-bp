import firebase from 'firebase-admin'

if (!process.env.SERVICE_ACCOUNT) {
	console.error('[FIREBASE] Missing ENV.SERVICE_ACCOUNT')
	process.exit(1)
}

try {

	/* FIREBASE INIT */
	const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)

	firebase.initializeApp({
		credential: firebase.credential.cert(serviceAccount),
		storageBucket: `${serviceAccount.project_id}.appspot.com`
	})

} catch (err) {
	console.error('[FIREBASE] Unable to initialize client instance')
	process.exit(1)
}


/* FIRESTORE INIT */
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const filter = firebase.firestore.Filter
export const fieldValue = firebase.firestore.FieldValue

/**
 * Create a DB reference for the given path
 * @param {...string} segments Path segments
 * @returns {object} Document or Collection reference
*/
export const getRef = (...segments) => {

	let refType = segments.length % 2
		? 'collection'
		: 'doc'

	return db[refType](segments.join('/'))

}

/**
 * Get document data
 * @param {string} segments Path segments
 * @returns {object} Empty object if document doesn't exist
 */
export const getDocument = (...segments) => {

	// check if passed segments count is wrong
	if (segments.length % 2)
		throw new Error(`Invalid document path, ${segments.join('/')}`)

	return db.doc(segments.join('/'))
		.get()
		.then(doc => doc.exists ? doc.data() : {})
		.catch(err => {
			console.error(err)
			return {}
		})

}