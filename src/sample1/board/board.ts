console.log("aaaa");
const bp:HTMLDivElement = document.querySelector('#board-parent')!
export const bo:HTMLDivElement = <HTMLDivElement>document.createElement('div')
let board_width:number = bo?.offsetWidth
bo.style.backgroundColor = '#FF000010'
bo.style.position = 'relative'
boardOutlineResize()
window.onresize = () => {
	boardOutlineResize()
}
function boardOutlineResize():void {
	board_width = bp?.offsetWidth
	bo.style.width = board_width + 'px'
	bo.style.height = (board_width! * (3/10)) + 'px'
}



console.log("bo width: "+ bo?.clientWidth);
console.log("bo height: "+ bo?.clientHeight);
for (let i = 0; i < 3; i++){
	for (let j = 0; j < 10; j++){
		const key:HTMLDivElement = <HTMLDivElement>document.createElement('div')
		key.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
		key.style.position = 'absolute'
		const key_width:number = board_width / 10
		key.style.width = key_width + 'px'
		key.style.height = key_width + 'px'
		key.style.left = j * key_width + 'px'
		key.style.top = i * key_width + 'px'
		bo.appendChild(key)
	}
}

export {}