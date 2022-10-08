//const body = document.querySelector('body')
//body?.appendChild(document.createTextNode('sample1'))
import { bo } from './board/board'
import './board/board.ts'


let url:URL = new URL(location.href)
let params:URLSearchParams = url.searchParams
let name = params.get('name')
console.log("name: " + name)
console.log(location.search)

if(name == 'board'){
	const bp:HTMLDivElement = document.querySelector('#board-parent')!
	bp?.appendChild(bo)
}else{
}

export {}