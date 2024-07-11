import {auth, db, storage} from '#utils/firebase.js'
import path from 'path'

// check authentication
export const hasAuth = async (_, res) => {

	try {
		await auth.getUserByPhoneNumber('+16505551234')
	} catch (err) {
		return res.status(500).json({error: err.message})
	}

	res.json({success: true})

}

// check storage
export const hasStorage = async (_, res) => {

	let filename = './.gitignore'

	try {
		const bucket = storage.bucket()
		await bucket.upload(path.resolve(filename), {destination: filename})
		await bucket.file(filename).delete()
	} catch (err) {
		return res.status(500).json({error: err.message})
	}

	res.json({success: true})

}

// check database
export const hasDatabase = async (_, res) => {

	try {
		await db.collection('users').doc('random').get()
	} catch (err) {
		return res.status(500).json({error: err.message})
	}

	res.json({success: true})

}