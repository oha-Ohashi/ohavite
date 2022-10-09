console.log("aaaa");
export const boardparent:HTMLDivElement = <HTMLDivElement>document.createElement('div')!
boardparent.style.backgroundColor = 'aqua'
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
window.onresize = () => {
	console.log("reresize")
	boardOutlineResize()
	drawKeys()
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
			key.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
			key.style.borderRadius = '50%'
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
export {}