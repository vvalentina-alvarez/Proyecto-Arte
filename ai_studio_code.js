// === Referencias a elementos ===
const contadorDisplay = document.getElementById('contador');
const bloqueNegro = document.getElementById('bloque-negro');
const contadorNegroDisplay = document.getElementById('contador-negro');
const botonLateral = document.getElementById('botonLateral');
const musica = document.getElementById('musicaFondo');
const encuesta = document.getElementById('formulario');

const TIEMPO_PRINCIPAL = 15; 
const TIEMPO_ESPERA = 5;    

let temporizadorPrincipalID;
let temporizadorEsperaID;

// === Inicia el contador principal ===
function iniciarContadorPrincipal() {
    let tiempo = TIEMPO_PRINCIPAL;
    
    contadorDisplay.style.display = 'block';
    bloqueNegro.style.display = 'none';

    contadorDisplay.textContent = tiempo;

    if (temporizadorPrincipalID) clearInterval(temporizadorPrincipalID);

    temporizadorPrincipalID = setInterval(() => {
        tiempo--;
        contadorDisplay.textContent = tiempo;

        // A medida que pasa el tiempo, simula "fallos"
        if (tiempo === 10) simularFallaInicial();
        if (tiempo === 5) simularFallaAvanzada();

        if (tiempo <= 0) {
            clearInterval(temporizadorPrincipalID); 
            iniciarContadorEspera();              
        }
    }, 1000); 
}

// === Fase de espera (bloqueo total) ===
function iniciarContadorEspera() {
    let tiempo = TIEMPO_ESPERA;

    contadorDisplay.style.display = 'none';
    bloqueNegro.style.display = 'flex';

    contadorNegroDisplay.textContent = tiempo;

    if (temporizadorEsperaID) clearInterval(temporizadorEsperaID);

    temporizadorEsperaID = setInterval(() => {
        tiempo--;
        contadorNegroDisplay.textContent = tiempo;

        if (tiempo <= 0) {
            clearInterval(temporizadorEsperaID); 
            restaurarInteraccion();
            iniciarContadorPrincipal();         
        }
    }, 1000); 
}

// === Cambia entre los textos principales ===
function cambiarContenido() {
    const actual = document.querySelector('.mostrar');
    let siguiente = actual.nextElementSibling;

    while (siguiente && !siguiente.classList.contains('ocultar')) {
        siguiente = siguiente.nextElementSibling;
    }

    if (!siguiente) siguiente = document.getElementById('t1');

    actual.classList.replace('mostrar', 'ocultar');
    siguiente.classList.replace('ocultar', 'mostrar');
}

// === Efectos de “fallo progresivo” ===
function simularFallaInicial() {
    // Bloquear el botón lateral temporalmente
    botonLateral.disabled = true;
    botonLateral.style.opacity = "0.5";
    // Distorsionar el audio ligeramente
    musica.playbackRate = 0.9;
    musica.volume = 0.7;
    // Avisar visualmente
    document.body.style.filter = "grayscale(50%)";
}

function simularFallaAvanzada() {
    // Desactivar todo el formulario
    const inputs = encuesta.querySelectorAll("input, button");
    inputs.forEach(el => el.disabled = true);
    encuesta.style.opacity = "0.5";
    // Distorsionar más el sonido
    musica.playbackRate = 0.7;
    musica.volume = 0.4;
    // Aumentar el “fallo” visual
    document.body.style.filter = "grayscale(100%) blur(1px)";
}

// === Restaurar interacción cuando el contador se reinicia ===
function restaurarInteraccion() {
    botonLateral.disabled = false;
    botonLateral.style.opacity = "1";

    const inputs = encuesta.querySelectorAll("input, button");
    inputs.forEach(el => el.disabled = false);
    encuesta.style.opacity = "1";

    document.body.style.filter = "none";
    musica.playbackRate = 1;
    musica.volume = 1;
}

// === Iniciar al cargar la página ===
window.onload = iniciarContadorPrincipal;
