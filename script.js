//elements
let blue=document.querySelector('.blue')
let red=document.querySelector('.red')
let green=document.querySelector('.green')
let yellow=document.querySelector('.yellow')
let level=document.querySelector('.level')
	
gameOrder=[];
gameScore=0;
order=0
isPLaying=true
nivel=10000/parseInt(level.value)

level.addEventListener('input', (e)=>{
	nivel=10000/parseInt(e.data)
	//console.log(nivel)
})

//0 = blue
//1 = red
//2 = green
//3 = yellow

// ----- functions -------

//random order
let randomOrde=()=>{
	for (var i = 0; i < 10; i++) {
		let number= Math.floor(Math.random()*4)
		gameOrder[gameOrder.length]=number
	}

	// betweenEachColor()

}   	

// Radonização das cores
let changeColorElement=()=>{
	blue.classList.remove('selected')
	red.classList.remove('selected')
	green.classList.remove('selected')
	yellow.classList.remove('selected')

	if(gameOrder[order]===0){
		blue.classList.add('selected')
	}else if(gameOrder[order]===1){
		red.classList.add('selected')
	}else if(gameOrder[order]===2){
		green.classList.add('selected')
	}else if(gameOrder[order]===3){
		yellow.classList.add('selected')
	}

	if(order === 10){
		order=0
		win()
	}else{
		betweenEachColor()
	}
	// console.log(' Ordem ' + order )
	// console.log('Ordem do array game order ' +	gameOrder[order])
}

// tempo entre uma cor e outra

let betweenEachColor=()=>{
	let time;
	if(isPLaying){
		time=setTimeout(() => {	
			changeColorElement()
			order++
		}, nivel);
	}else{
		clearTimeout(time)
	}
}


// captura os clicks do usuario
function playerClick(e) {
	if(isPLaying){
		if(e.classList[1] == 'selected' ){
			// console.log(e.classList)
			e.classList.remove('selected')
			gameScore++
			//changeColorElement()
		}else{
			
			isPLaying=false
			// console.log(isPLaying)
		}
	}else{
		gameOver()
	}  
}


//função de inciar
let playGame=()=>{
		let time=nivel/1000
		let timeTamp=setInterval(()=>{
			--time
			if(time < 0){
				clearInterval(timeTamp)
				//console.log(timeTamp)
			}
		},1000)
		betweenEachColor()
		randomOrde()
}

let gameOver=()=>{
	alert(`Infelizmente você erro, Sua pontuação foi ${gameScore}`)
	let resp=confirm('Deseja jogar novamente? S/N ?')
	if(resp){
		isPLaying=true
		playGame()
	}else{
		isPLaying=false
	}

	localStorage.lastPontuation=`${gameScore} pontos no Level ${level.value}`
}


let win=()=>{
	let resp=confirm(`Você é fera nesse jogo sua pontuação foi ${gameScore} <br> deseja jogar novamente um level mais dificil?`)
	let valueLevel= parseInt(level.value)
	if(resp){
		localStorage.lastPontuation=`${gameScore} pontos no Level ${level.value}`
		if(level.value=== '10'){
			alert('Você já esta no level mais alto')
		}else{
			console.log(valueLevel)
			level.value=valueLevel+1
		}
		gameScore=0
		playGame()
	}else{
		isPLaying=false
		alert('Seus pontos são '+ gameScore)
	}
}

// adicona os clicks aos botões
blue.onclick=(e)=>{
	playerClick(e.target)
}

red.onclick=(e)=>{
	playerClick(e.target)
}

green.onclick=(e)=>{
	playerClick(e.target)
}

yellow.onclick=(e)=>{
	playerClick(e.target)
}

