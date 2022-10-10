const massConst: number = 1
const airFrictionConst: number = 0.1
const gConst = 9.8
const Gconst = 6.67 * Math.pow(10, -1)
const springConstMidFing: number = 4
const muConst: number = 0.1
const springNaturalLength: number = 0.2
const forceConst: number = 5
const frameDuration: number = 10
//let inputCoords: {x:number, y:number}[] = [{x:5,y:0},{x:6,y:0},{x:9,y:0},{x:5,y:0}]
let inputCoords: {x:number, y:number}[] = [{x:5,y:0},{x:6,y:0},{x:9,y:2},{x:0,y:2}]
let inputCount: number = 0

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export async function genHistory(): Promise<Array<Array<{x: number, y: number}>>> {
	let res: Array<Array<{x: number, y: number}>> = <Array<Array<{x: number, y: number}>>> []
	let fingers: Finger[] = <Finger[]> []
	for(let x of [0,1,2,3, 6,7,8,9]){
		fingers.push(new Finger(x, {x: x, y: 1}))
	}
	for(let i = 0; i < 5; i++){
		//inputCoords.push({x: getRandomInt(10), y: getRandomInt(3)})
	}
	console.log(inputCoords)
	let i = 0
	 for (i = 0; inputCount < inputCoords.length && i < 10000; i++){
		fingers = resetForces(fingers)
		fingers = updateSprings2(fingers)
		fingers = updateForce(inputCoords[inputCount], fingers)
		fingers = updateVelocities(fingers)
		fingers = updatePositions(fingers)
		res.push(fingers.map((f) => { return{x:f.xy.x, y:f.xy.y} }))
		//await new Promise(resolve => setTimeout(resolve, 0.001)) // 3秒待つ
		//fingers[2].x += 0.2
		//fingers = updateSprings2(fingers)
	}
	console.log("end at "+ i)
	//console.log(res)
	return res
}

class Finger {
	id: number
	xy: {x: number, y: number}
	m: number = 0.2  // 質量
	vx: number = 0
	vy: number = 0
	fx: number = 0
	fy: number = 0

	constructor(id: number, xy: {x: number, y: number}){
		this.id = id
		this.xy = xy
	}
}

function resetForces(fingers: Finger[]): Finger[] {
	for(let i = 0; i < 8; i++){
		fingers[i].fx = 0
		fingers[i].fy = 0
	}
	return fingers
}

function updateSprings2(fingers: Finger[]): Finger[] {   //onecycle: frameDuration ms
	let connectTo: number[][] = [[2],[2],[0,1,3],[2], [5],[4,6,7],[5],[5]]
	let springLengths: number[][] = [[2],[1],[2,1,1],[1], [1],[1,1,2],[1],[2]]
	for(let i = 0; i < 8; i++){
		let fx: number = 0
		let fy: number = 0
		for(let j = 0; j < connectTo[i].length; j++){
			let x: number = (fingers[connectTo[i][j]].xy.x - fingers[i].xy.x)
			fx += springConstMidFing * Math.sign(x) * (Math.abs(x) - springLengths[i][j])
			//fx += springConstMidFing * (x - 0)
			let y: number = (fingers[connectTo[i][j]].xy.y - fingers[i].xy.y)
			fy += springConstMidFing * (y - 0)
			//fy += -1 * Math.sign(y) * muConst * Gconst * massConst
		}
		let y: number = 1 - fingers[i].xy.y 
		//console.log(y)
		fingers[i].fx += fx
		fingers[i].fy += fy
	}
	return fingers
}

const Kp = 5
const Ki = 0
const Kd = 0
let P: number[] = [0, 0]
let PreP: number[] = [0, 0]
let I: number[] = [0, 0]
let D: number[] = [0, 0]
let U: number[] = [0, 0]
let preTime: number = performance.now()
function updateForce(target: {x: number, y: number}, fingers: Finger[]): Finger[] {
	// update the force of moving finger
	let closestFinger = fingers[0]
	let closestDistance = 1000
	for(let i = 1; i < 8; i++){
		let dist: number = calcDistLongX(target, fingers[i].xy)
		if(dist < closestDistance){
			closestFinger = fingers[i]
			closestDistance = dist
		}
	}
	//console.log("closest:" + closestFinger.id)

	const cos: number = (target.x - closestFinger.xy.x) / closestDistance
	const sin: number = (target.y - closestFinger.xy.y) / closestDistance

	let fingerForceX = (forceConst * cos)// * Math.pow(closestDistance, 2)
	let fingerForceY = (forceConst * sin)// * Math.pow(closestDistance, 2)

	if(closestDistance > 0.05){
	//if(closestDistance > -1){
		//closestFinger.fx += U[0]
		//closestFinger.fy += U[1]
		//closestFinger.fx = fingerForceX
		//closestFinger.fy = fingerForceY //+ frictionForceY
		//closestFinger.xy.x += xU 
		closestFinger.xy.x += (target.x - closestFinger.xy.x) / 10
		closestFinger.xy.y += (target.y - closestFinger.xy.y) / 10
	}else{
		//I = [0, 0]
		console.log("stop at " + inputCount)
		closestFinger.fx = 0
		closestFinger.fy = 0
		closestFinger.vx = 0
		closestFinger.vy = 0
		inputCount++
	}

	for(let i = 1; i < 8; i++){
		//fingers[i].fx += -1 * Math.sign(fingers[i].vx) * muConst * gConst * massConst
		//fingers[i].fy += -1 * Math.sign(fingers[i].vy) * muConst * gConst * massConst
		//fingers[i].fx += -1 * Math.sign(fingers[i].vx) * airFrictionConst * Math.pow(fingers[i].vx, 2)
	}
	return fingers
}


function updateVelocities(fingers: Finger[]): Finger[] {   //onecycle: frameDuration ms
	for(let finger of fingers){
		finger.vx += (finger.fx / massConst) * (frameDuration / 1000)
		finger.vy += (finger.fy / massConst) * (frameDuration / 1000)
	}
	return fingers
}
 
function updatePositions(fingers: Finger[]): Finger[] {   //onecycle: frameDuration ms
	for(let i = 0; i < fingers.length; i++){
		const xDiff = fingers[i].vx  * (frameDuration / 1000)
		const yDiff = fingers[i].vy  * (frameDuration / 1000)
		/*if(i >= 1){
			if(fingers[i - 1].xy.x + 1 < fingers[i].xy.x + xDiff){
				fingers[i].xy.x += xDiff
				fingers[i].xy.y += yDiff
			}else{
				fingers[i].xy.x = fingers[i - 1].xy.x + 1
			}
		}*/
		fingers[i].xy.x += xDiff
		fingers[i].xy.y += yDiff
	}
	return fingers
}

function calcDistLongX(coord1: {x: number, y: number}, coord2: {x: number, y: number}): number {
	let powed: number = Math.pow((coord1.x - coord2.x) * 5, 2) + Math.pow((coord1.y - coord2.y), 2)
	return Math.sqrt(powed)
}

function calcDist(coord1: {x: number, y: number}, coord2: {x: number, y: number}): number {
	let powed: number = Math.pow((coord1.x - coord2.x), 2) + Math.pow((coord1.y - coord2.y), 2)
	return Math.sqrt(powed)
}

