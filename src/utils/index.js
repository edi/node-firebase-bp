import {scheduleJob} from 'node-schedule'

/**
 * Logger class
 */
export class Log {
	constructor(tag) {
		return function() {

			const params = Array.from(arguments)

			if (tag)
				params.unshift(`[${tag}]`)

			return console.log.apply(console.log, params)

		}
	}
}

/**
 * Sleeping method
 * @param {int} seconds Time to sleep in seconds
 * @returns Promise
 */
export const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))

/**
 * Round with decimals
 * @param {float} number
 * @param {int} decimals
 * @returns {float} Rounded number
 */
export const round = (number = 0, decimals = 0) => {
	return Math.round(number * 10 ** decimals) / 10 ** decimals
}

export const getNET = (amount, vatPerc, decimals = 3) => {

	if (!vatPerc)
		return amount

	return round(amount / (1 + vatPerc / 100), decimals)

}

export const getVAT = (amount, vatPerc, decimals = 3) => {

	if (!vatPerc)
		return 0

	return round(amount * (1 - (1 / (1 + vatPerc / 100))), decimals)

}

/**
 * Method to capitalize each word in a string
 * @param {string} str Text to capitalize
 */
export const toTitleCase = str => {
	return str.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

/**
 * Split an array into smaller arrays of specified length
 * @param {object} array List of items to split
 * @param {integer} chunkSize Number of items per chunk
 * @returns {object} List of split chunks at specified length
 */
export const chunkArray = (array, chunkSize) => {
	let list = [...array]
	return new Array(Math.ceil(list.length / chunkSize)).fill().map(_ => list.splice(0, chunkSize))
}

/**
 * Schedule jobs
 * @param {function} method Method to trigger
 * @param {(string|integer)} timing Timing descriptor cron-style or seconds
 * @returns {boolean} Schedule status
 */
export const schedule = (method, timing, forceRun = false) => {

	if (forceRun)
		method()

	// ignore if not in production
	if (!process.env.PRODUCTION)
		return false

	// sub-minute trigger
	if (typeof timing === 'number')
		return setInterval(method, timing * 1000)

	// schedule job
	return scheduleJob(timing, method)

}