const seleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const btnMascotaJugador = document.getElementById('btn-mascota')
const bntReiniciar = document.getElementById('btn-reiniciar')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const seleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaRival = document.getElementById('mascota-rival')

const spanVidasJugador = document.getElementById('vida-jugador')
const spanVidasRival = document.getElementById('vida-rival')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelRival = document.getElementById('ataque-del-rival')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones

let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucalma
let inputPydos

let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo

let btnFuego
let btnAgua
let btnTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador = 0
let victoriasEnemigo = 0
let vidaJugador = 3
let vidaRival = 3

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/pk1.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/pk2.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/pk3.png', 5)
let langostelvis = new Mokepon('Langostelvis', './assets/pk4.png', 5)
let tucalma = new Mokepon('Tucalma', './assets/pk5.png', 5)
let pydos = new Mokepon('Pydos', './assets/pk6.png', 5)


hipodoge.ataques.push(
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🌱', id: 'btn-tierra'}
    )
capipepo.ataques.push(
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'}
)
ratigueya.ataques.push(
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🌱', id: 'btn-tierra'}
    )
langostelvis.ataques.push(
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🌱', id: 'btn-tierra'}
    )
tucalma.ataques.push(
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'}
)
pydos.ataques.push(
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🌱', id: 'btn-tierra'}
    )

mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,tucalma,pydos)
            
function iniciarJuego(){
    seleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="mascotas" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputTucalma = document.getElementById('Tucalma')
        inputPydos = document.getElementById('Pydos')
    })

    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    bntReiniciar.addEventListener('click', reinciarJuego)
}


function seleccionarMascotaJugador(){    
    seleccionarMascota.style.display = 'none'
    seleccionarAtaque.style.display = 'flex'

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else if(inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    }else if(inputTucalma.checked){
        spanMascotaJugador.innerHTML = inputTucalma.id
        mascotaJugador = inputTucalma.id
    }else if(inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    }else{        
        alert('Selecciona una Mascota')
    }
    
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    btnFuego= document.getElementById('btn-fuego')
    btnAgua= document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuanciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#2f58'
                boton.disabled = true
            } else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#2f58'
                boton.disabled = true
            } else if(e.target.textContent === '🌱'){
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#2f58'
                boton.disabled = true
            }
            ataquesAleatorioEnemigo()
        })
    })   
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)

    spanMascotaRival.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuanciaAtaque()
}

function ataquesAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){

    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]){
            indexAmbosOponentes(i,i)
            crearMensaje("EMPATE 🤜🤛")
        }else if(ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA'){
            indexAmbosOponentes(i,i)
            crearMensaje("🎉 GANASTE 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA'){
            indexAmbosOponentes(i,i)
            crearMensaje("🎉 GANASTE 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO'){
            indexAmbosOponentes(i,i)
            crearMensaje("🎉 GANASTE 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(i,i)
            crearMensaje("☠️ PERDISTE ☠️")
            victoriasEnemigo++
            spanVidasRival.innerHTML = victoriasEnemigo
        }
    }    
    revisarVidas()
}

function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('HUBO UN EMPATE!')
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('HAS GANADO!')
    }else{
        crearMensajeFinal('HAS PERDIDO!')
    }
}

function crearMensaje(resultado){
    sectionMensajes.innerHTML = resultado
    ataqueDelJugador.innerHTML = indexAtaqueJugador
    ataqueDelRival.innerHTML = indexAtaqueEnemigo
    // let parrafo = document.createElement('p')
    // parrafo.innerHTML = 'Tu mascota atacó con '+ataqueJugador+'\nla mascota del enemigo atacó con '+ataqueEnemigo
}

function crearMensajeFinal(resultadoFinal){
    if(resultadoFinal=='HAS GANADO!'){
        sectionMensajes.className +=" victoria"
    }else if(resultadoFinal == 'HAS PERDIDO!'){
        sectionMensajes.className +=" derrota"
    }
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'flex'
}


function reinciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+1)
}

window.addEventListener('load', iniciarJuego)