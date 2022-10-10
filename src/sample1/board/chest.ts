import './chest.css'
import { genHistory } from './physics';

console.log("chest");
export const boardparent:HTMLDivElement = <HTMLDivElement>document.createElement('div')!
boardparent.style.backgroundColor = '#00FF0020'
const boardoutline:HTMLDivElement = <HTMLDivElement>document.createElement('div')
boardoutline.id = 'board-outline'
boardparent.appendChild(boardoutline)

let board_width:number = boardparent?.clientWidth
boardoutline.className = 'board-outlines'
boardoutline.style.backgroundColor = '#FF000010'
boardoutline.style.position = 'relative'
setTimeout(() => {
	boardOutlineResize()
	drawKeys()
}, 10)
setTimeout(async() => {
	drawKeys
	drawFingers(await genHistory())
}, 1500)
window.onresize = () => {
	console.log("reresize")
	boardOutlineResize()
	//drawKeys()
}
function boardOutlineResize():void {
	board_width = boardparent?.clientWidth
	console.log(board_width)
	boardoutline.style.width = board_width + 'px'
	boardoutline.style.height = (board_width! * (3/10)) + 'px'
}

function drawKeys():void {
	boardoutline.innerHTML = ""
	for (let i = 0; i < 3; i++){
		for (let j = 0; j < 10; j++){
			const key:HTMLDivElement = <HTMLDivElement>document.createElement('div')
			//key.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
			key.style.border = '0.3px solid #AAAAAA';
			key.style.borderRadius = '50%'
			key.innerText = '{x:' + j + ', y:' + i + '}'
			key.style.fontSize = '14px'
			key.style.position = 'absolute'
			const key_width:number = board_width / 10
			key.style.width = key_width + 'px'
			key.style.height = key_width + 'px'
			key.style.left = j * key_width + 'px'
			key.style.top = i * key_width + 'px'
			boardoutline.appendChild(key)
		}
	}
}
async function drawFingers(history: {x: number, y: number}[][]): Promise<void> {
	for(let moment of history){
		const elms = document.querySelectorAll('.finger')
		elms.forEach((elm) => {
			boardoutline.removeChild(elm)
		});
		for(let i = 0; i < moment.length; i++){
			const key:HTMLDivElement = <HTMLDivElement>document.createElement('div')
			key.className = 'finger'
			key.id = 'finger' + i
			const key_width:number = board_width / 10
			key.style.width = key_width + 'px'
			key.style.height = key_width + 'px'
			key.style.left = moment[i].x * key_width + 'px'
			key.style.top = moment[i].y * key_width + 'px'
			boardoutline.appendChild(key)
		}
			const key:HTMLDivElement = <HTMLDivElement>document.createElement('div')
			key.className = 'finger'
			const key_width:number = board_width / 10
			key.style.width = key_width + 'px'
			key.style.height = key_width + 'px'
			key.style.left = 5 * key_width + 'px'
			key.style.top = 0 * key_width + 'px'
			boardoutline.appendChild(key)
		await new Promise(resolve => setTimeout(resolve, 5)) // 3秒待つ
		console.log("tick")
	}
}



export {}