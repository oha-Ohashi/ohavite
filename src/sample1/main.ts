//const body = document.querySelector('body')
//body?.appendChild(document.createTextNode('sample1'))
import { boardparent } from './board/board'

let url:URL = new URL(location.href)
let params:URLSearchParams = url.searchParams
let name = params.get('name')
console.log("name: " + name)
console.log(location.search)

if(name == 'board'){
	const maincont:HTMLDivElement = document.querySelector('#main-cont')!
	maincont?.appendChild(boardparent)
}else{
}

export {}