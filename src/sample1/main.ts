//import { boardparent } from './board/board'
import { boardparent } from './board/chest'

let url:URL = new URL(location.href)
let params:URLSearchParams = url.searchParams
let name = params.get('name')
console.log("name: " + name)
console.log(location.search)

if(name == 'board'){
	const maincont:HTMLDivElement = document.querySelector('#main-cont')!
	maincont?.appendChild(boardparent)
}else if(name == 'chest'){
	const maincont:HTMLDivElement = document.querySelector('#main-cont')!
	maincont?.appendChild(boardparent)
}else{
}

export {}

