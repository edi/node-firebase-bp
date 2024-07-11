/**
 * Validate JSON payload
 */
export default function (err, _, res, next) {

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
    return res.json({error: 'invalid_payload_format'})

  next()

}