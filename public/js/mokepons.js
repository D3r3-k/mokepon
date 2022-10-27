const seleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const btnMascotaJugador = document.getElementById('btn-mascota')
const bntReiniciar = document.getElementById('btn-reiniciar')
sectionReiniciar.style.display = 'none'

const seleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-rival')

const spanVidasJugador = document.getElementById('vida-jugador')
const spanVidasRival = document.getElementById('vida-rival')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-rival')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
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
let mascotaJugadorObjeto
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
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []        
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/pk1.png', 5, './assets/pk1.png')
let capipepo = new Mokepon('Capipepo', './assets/pk2.png', 5, './assets/pk2.png')
let ratigueya = new Mokepon('Ratigueya', './assets/pk3.png', 5, './assets/pk3.png')
let langostelvis = new Mokepon('Langostelvis', './assets/pk4.png', 5, './assets/pk4.png')
let tucalma = new Mokepon('Tucalma', './assets/pk5.png', 5, './assets/pk5.png')
let pydos = new Mokepon('Pydos', './assets/pk6.png', 5, './assets/pk6.png')


const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🌱', id: 'btn-tierra'}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'}
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🌱', id: 'btn-tierra'}
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const LANGOSTELVIS_ATAQUES = [
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🌱', id: 'btn-tierra'}
]

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const TUCALMA_ATAQUES = [
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'}
]

tucalma.ataques.push(...TUCALMA_ATAQUES)

const PYDOS_ATAQUES = [
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🌱', id: 'btn-tierra'}
]

pydos.ataques.push(...PYDOS_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,tucalma,pydos)
            
function iniciarJuego(){
    seleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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

    unirseAlJuego()

}

function unirseAlJuego() {
    fetch("http://192.168.1.2:8080/unirse")
    .then(function(res){
        if(res.ok){
            res.text()
            .then(function(respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
            }
        })
}

function seleccionarMascotaJugador(){    
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
        return
    }

    seleccionarMascota.style.display = 'none'
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
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
            
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.2:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res){
        if(res.ok){
            res.json()
            .then(function ({ ataques }){
                if (ataques.length === 5) {
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuanciaAtaque()
}

// function ataquesAleatorioEnemigo(){
//     console.log('Ataques enemigo', ataquesMokeponEnemigo)
//     let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

//     if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
//         ataqueEnemigo.push('FUEGO')
//     }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
//         ataqueEnemigo.push('AGUA')
//     }else{
//         ataqueEnemigo.push('TIERRA')
//     }
// }

// function iniciarPelea(){
//     if(ataqueJugador.length === 5){
//         combate()
//     }
// }

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

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
    // let nuevoAtaqueDelJugador = document.createElement('p')
    // let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    ataqueDelJugador.innerHTML = indexAtaqueJugador
    ataqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    // ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    // ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
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
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}

function enviarPosicion(x,y) {
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if(res.ok){
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/pk1.png', 5, './assets/pk1.png', enemigo.id)
                        }else if(mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/pk2.png', 5, './assets/pk2.png', enemigo.id)
                        }else if(mokeponNombre === "Ratigueya"){
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/pk3.png', 5, './assets/pk3.png', enemigo.id)
                        }else if(mokeponNombre === "Langostelvis"){
                            mokeponEnemigo = new Mokepon('Langostelvis', './assets/pk4.png', 5, './assets/pk4.png', enemigo.id)
                        }else if(mokeponNombre === "Tucalma"){
                            mokeponEnemigo = new Mokepon('Tucalma', './assets/pk5.png', 5, './assets/pk5.png', enemigo.id)
                        }else if(mokeponNombre === "Pydos"){
                            mokeponEnemigo = new Mokepon('Pydos', './assets/pk6.png', 5, './assets/pk6.png', enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x || 0
                        mokeponEnemigo.y = enemigo.y || 0

                        return mokeponEnemigo
                    })
                    

                })
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjectoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjectoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una colicion");

    enemigoId = enemigo.id
    seleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)