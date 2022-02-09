import marked from 'marked'

export default {
	markdown: function (text ='') {
		debugger
		console.log(text)
		// return text
		return marked( text.replace(/\n/g, '\n\n'))
	},
	
	highlightKeyAndMarkdown: function (text) {
		let paras = text.split('\n')
		let result = paras.map((para) => {
			return para.replace(/^([^：]+)：/g, '**$1：**')
		}).join('\n\n')
	
		return marked(result)
	},
}