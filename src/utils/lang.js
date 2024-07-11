import {printf} from 'fast-printf'
import TRANSLATIONS from '#config/lang.js'
/**
 * Translate message
 * @param {string} descriptor Translation identifier
 * @param {array} [subtitutes] List of ordered substitutes
 * @returns {string} Translated message
 */
export default function lang(descriptor, language = 'en', substitutes = []) {

	// language key
	let lang = Object.keys(TRANSLATIONS).includes(language) ? language : 'en'

	// get translation
	let message = (TRANSLATIONS[lang])?.[descriptor] || `${language}::${descriptor}`

	// apply substitutes (if any)
	return printf.apply(this, [message, ...substitutes])

}