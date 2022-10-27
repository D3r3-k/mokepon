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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

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
    constructor(nombre, foto, vida, fotoMapa){
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

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/pk1.png', 5, './assets/pk1.png')
let capipepoEnemigo = new Mokepon('Capipepo', './assets/pk2.png', 5, './assets/pk2.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/pk3.png', 5, './assets/pk3.png')
let langostelvisEnemigo = new Mokepon('Langostelvis', './assets/pk4.png', 5, './assets/pk4.png')
let tucalmaEnemigo = new Mokepon('Tucalma', './assets/pk5.png', 5, './assets/pk5.png')
let pydosEnemigo = new Mokepon('Pydos', './assets/pk6.png', 5, './assets/pk6.png')


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

// ENEMIGOS 
hipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🌱', id: 'btn-tierra'}
    )
capipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'}
)
ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🌱', id: 'btn-tierra'}
    )
langostelvisEnemigo.ataques.push(
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'},
    { nombre: '🌱', id: 'btn-tierra'}
    )
tucalmaEnemigo.ataques.push(
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '🌱', id: 'btn-tierra'},
    { nombre: '💧', id: 'btn-agua'},
    { nombre: '🔥', id: 'btn-fuego'}
)
pydosEnemigo.ataques.push(
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
}


function seleccionarMascotaJugador(){    
    seleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    
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
    
    iniciarMapa()
    extraerAtaques(mascotaJugador)
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

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaRival.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
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

    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }

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
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjectoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre)
        return mokepones[i]
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una colicion");
    seleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    // alert("Hay colision con "+enemigo.nombre)
}

window.addEventListener('load', iniciarJuego)