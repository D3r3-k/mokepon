let ataqueJugador
let ataqueEnemigo

let vidaJugador = 3
let vidaRival = 3

function iniciarJuego(){
    let seleccionarAtaque = document.getElementById('seleccionar-ataque')
    seleccionarAtaque.style.display = 'none'
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let btnMascotaJugador = document.getElementById('btn-mascota')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let btnFuego = document.getElementById('btn-fuego')
    btnFuego.addEventListener('click',ataqueFuego)
    let btnAgua = document.getElementById('btn-agua')
    btnAgua.addEventListener('click',ataqueAgua)
    let btnTierra = document.getElementById('btn-tierra')
    btnTierra.addEventListener('click',ataqueTierra)
    
    let bntReiniciar = document.getElementById('btn-reiniciar')
    bntReiniciar.addEventListener('click', reinciarJuego)
    bntReiniciar.disabled = true
}


function seleccionarMascotaJugador(){
    let hipoge = document.getElementById('hipoge')
    let capipepo = document.getElementById('capipepo')
    let ratigueya = document.getElementById('ratigueya')
    let langostelvis = document.getElementById('langostelvis')
    let tucalma = document.getElementById('tucalma')
    let pydos = document.getElementById('pydos')

    let spanMascotaJugador = document.getElementById('mascota-jugador')

    let seleccionarAtaque = document.getElementById('seleccionar-ataque')
    let seleccionarMascota = document.getElementById('seleccionar-mascota')
    
    if(hipoge.checked){
        // alert('Seleccionaste a Hipoge')
        spanMascotaJugador.innerHTML = "Hipoge"
        seleccionarAtaque.style.display = 'flex'
        seleccionarMascota.style.display = 'none'
    }else if(capipepo.checked){
        // alert('Seleccionaste a Capipepo')
        spanMascotaJugador.innerHTML = "Capipepo"
        seleccionarAtaque.style.display = 'flex'
        seleccionarMascota.style.display = 'none'
    }else if(ratigueya.checked){
        // alert('Seleccionaste a Ratigueya')
        spanMascotaJugador.innerHTML = "Ratigueya"
        seleccionarAtaque.style.display = 'flex'
        seleccionarMascota.style.display = 'none'
    }else if(langostelvis.checked){
        // alert('Seleccionaste a Langostelvis')
        spanMascotaJugador.innerHTML = "Langostelvis"
        seleccionarAtaque.style.display = 'flex'
        seleccionarMascota.style.display = 'none'
    }else if(tucalma.checked){
        // alert('Seleccionaste a Tucalma')
        spanMascotaJugador.innerHTML = "Tucalma"
        seleccionarAtaque.style.display = 'flex'
        seleccionarMascota.style.display = 'none'
    }else if(pydos.checked){
        // alert('Seleccionaste a Pydos')
        spanMascotaJugador.innerHTML = "Pydos"
        seleccionarAtaque.style.display = 'flex'
        seleccionarMascota.style.display = 'none'
    }else{
        alert('Selecciona una Mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let mascotaRival = aleatorio(1,6)
    let spanMascotaRival = document.getElementById('mascota-rival')

    if(mascotaRival == 1){
        spanMascotaRival.innerHTML = "Hipoge"
    }else if(mascotaRival == 2){
        spanMascotaRival.innerHTML = "Capipepo"
    }else if(mascotaRival == 3){
        spanMascotaRival.innerHTML = "Ratigueya"
    }else if(mascotaRival == 4){
        spanMascotaRival.innerHTML = "Langostelvis"
    }else if(mascotaRival == 5){
        spanMascotaRival.innerHTML = "Tucalma"
    }else if(mascotaRival == 6){
        spanMascotaRival.innerHTML = "Pydos"
    }
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueRival()
}
function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueRival()
}
function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueRival()
}

function ataqueRival(){
    let ataqueAleatorio = aleatorio(1,3)
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO'
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA'
    }else if(ataqueAleatorio == 3){
        ataqueEnemigo = 'TIERRA'
    }

    batalla()
}


function batalla(){
    let spanVidasJugador = document.getElementById('vida-jugador')
    let spanVidasRival = document.getElementById('vida-rival')

    if(ataqueJugador == ataqueEnemigo){
        crearMensaje("EMPATE 🤜🤛")
    }else if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        crearMensaje("🎊 GANASTE 🎊")
        vidaRival--
        spanVidasRival.innerHTML = vidaRival
    }else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        crearMensaje("🎊 GANASTE 🎊")
        vidaRival--
        spanVidasRival.innerHTML = vidaRival
    }else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        crearMensaje("🎊 GANASTE 🎊")
        vidaRival--
        spanVidasRival.innerHTML = vidaRival
    }else{
        crearMensaje("☠️ PERDISTE ☠️")
        vidaJugador--
        spanVidasJugador.innerHTML = vidaJugador
    }
    
    revisarVidas()
}

function revisarVidas(){
    let bntReiniciar = document.getElementById('btn-reiniciar')
    if(vidaRival == 0){
        crearMensajeFinal('HAS GANADO!')
        bntReiniciar.disabled = false
    }else if(vidaJugador == 0){
        crearMensajeFinal('HAS PERDIDO!')
        bntReiniciar.disabled = false
    }
}

function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('resultado')
    let ataqueDelJugador = document.getElementById('ataque-del-jugador')
    let ataqueDelRival = document.getElementById('ataque-del-rival')

    sectionMensajes.innerHTML = resultado
    ataqueDelJugador.innerHTML = ataqueJugador
    ataqueDelRival.innerHTML = ataqueEnemigo

    // let parrafo = document.createElement('p')
    // parrafo.innerHTML = 'Tu mascota atacó con '+ataqueJugador+'\nla mascota del enemigo atacó con '+ataqueEnemigo
    
}

function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('resultado')

    if(resultadoFinal=='HAS GANADO!'){
        sectionMensajes.className +=" victoria"
    }else if(resultadoFinal == 'HAS PERDIDO!'){
        sectionMensajes.className +=" derrota"

    }

    sectionMensajes.innerHTML = resultadoFinal

    let btnFuego = document.getElementById('btn-fuego')
    btnFuego.disabled = true
    let btnAgua = document.getElementById('btn-agua')
    btnAgua.disabled = true
    let btnTierra = document.getElementById('btn-tierra')
    btnTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'flex'
}


function reinciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+1)
}

window.addEventListener('load', iniciarJuego)