import lang from '#utils/lang.js'

export default function(err, _, res, next) {

	const error = err?.message || (typeof err === 'string' ? err : 'internal_error')

	return res.json({
		error,
		message: lang(error, res.locals.language)
	})

}