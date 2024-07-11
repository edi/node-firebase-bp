import {glob} from 'glob'

const files = await glob('./src/jobs/*.js')
const list = []

for (let i = 0; i < files.length; i++) {
	const component = await import(files[i].replace('src/', '#'))
	list.push([component.default, component.timing, component.forceRun])
}

export default list