export const test = async (_, res, next) => {

	try {
		throw new Error('test_message')
	} catch (err) {
		return next(err)
	}

	return res.json({test: true})

}