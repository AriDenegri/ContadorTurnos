// Carga los turnos restantes y el turno actual desde el Local Storage o usa los valores iniciales
let turnosRestantes = localStorage.getItem("turnosRestantes") 
    ? parseInt(localStorage.getItem("turnosRestantes")) 
    : 43200;

let turnoActual = localStorage.getItem("turnoActual") 
    ? parseInt(localStorage.getItem("turnoActual")) 
    : 43200;  // Comienza en el turno máximo (43200)

const turnosRestantesEl = document.getElementById("turnosRestantes");
const mensajeFinalEl = document.getElementById("mensajeFinal");
const pasarTurnoBtn = document.getElementById("pasarTurnoBtn");
const resetearBtn = document.getElementById("resetearBtn");
const turnosInput = document.getElementById("turnosInput");
const errorMensaje = document.getElementById("errorMensaje");

// Nueva función para calcular y mostrar los días restantes
function calcularDiasRestantes() {
    const diasRestantes = Math.floor(turnosRestantes / 1440);
    const diasRestantesEl = document.getElementById("diasRestantes");
    diasRestantesEl.textContent = `Días restantes: ${diasRestantes}`;
}

// Actualiza la interfaz con los turnos restantes, días restantes y el estado del botón
function actualizarInterfaz() {
    turnosRestantesEl.textContent = `Turnos restantes: ${turnosRestantes}`;
    calcularDiasRestantes(); // Llama a la función para mostrar los días restantes

    const turnoAnteriorEl = document.getElementById("turnoAnterior");
    turnoAnteriorEl.textContent = `Turno anterior: ${turnoActual - 1}`;

    const turnoActualEl = document.getElementById("turnoActual");
    turnoActualEl.textContent = `Turno actual: ${turnoActual}`;

    if (turnosRestantes === 0) {
        mensajeFinalEl.textContent = "¡Tiempo agotado!";
        pasarTurnoBtn.disabled = true;
    } else {
        mensajeFinalEl.textContent = "";
        pasarTurnoBtn.disabled = false;
    }
}

// Guarda los turnos restantes y el turno actual en el Local Storage
function guardarTurnos() {
    localStorage.setItem("turnosRestantes", turnosRestantes);
    localStorage.setItem("turnoActual", turnoActual);
}

// Manejador para el botón "Pasar turno"
pasarTurnoBtn.addEventListener("click", () => {
    if (turnosRestantes > 0) {
        const turnoAnterior = turnoActual; // Guardamos el turno anterior
        turnosRestantes--; // Restamos un turno
        turnoActual++; // Incrementamos el turno actual
        guardarTurnos(); // Guardamos el nuevo valor de turnos restantes y turno actual
        actualizarInterfaz(); // Actualizamos la interfaz
    }
});

// Manejador para el botón "Resetear contador"
resetearBtn.addEventListener("click", () => {
    turnosRestantes = 43200;
    turnoActual = 43200; // Resetear turno actual al valor máximo (43200)
    guardarTurnos();
    actualizarInterfaz();
});

// Manejador para el input de turnos
turnosInput.addEventListener("input", (e) => {
    let valorIngresado = parseInt(e.target.value);
    
    if (valorIngresado > 43200) {
        errorMensaje.style.display = 'block';  // Muestra el mensaje de error
        e.target.value = 43200;  // Resetea el valor al límite máximo
        turnosRestantes = 0;  // Ajusta la variable de turnos restantes a 0
        turnoActual = 43200; // Ajusta el turno actual al máximo
    } else if (valorIngresado < 1) {
        errorMensaje.style.display = 'block';  // Muestra el mensaje de error
        e.target.value = 1;  // Resetea el valor al mínimo (1)
        turnosRestantes = 43199;  // Ajusta los turnos restantes al máximo menos 1
        turnoActual = 1;  // Ajusta el turno actual al mínimo (1)
    } else {
        errorMensaje.style.display = 'none';  // Oculta el mensaje de error
        turnoActual = valorIngresado;  // Actualiza el valor de los turnos actuales
        turnosRestantes = 43200 - turnoActual;  // Calcula los turnos restantes

        // Mostrar turno anterior y turno actual
        const turnoAnterior = turnoActual - 1;
        const turnoAnteriorEl = document.getElementById("turnoAnterior");
        turnoAnteriorEl.textContent = `Turno anterior: ${turnoAnterior}`;

        const turnoActualEl = document.getElementById("turnoActual");
        turnoActualEl.textContent = `Turno actual: ${turnoActual}`;
    }
    
    guardarTurnos();  // Guarda el valor de los turnos restantes y turno actual
    actualizarInterfaz();  // Actualiza la interfaz
});
// Función para generar un número aleatorio entre 1 y el máximo del dado
function tirarDado(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Manejadores de eventos para cada dado
document.getElementById("d5Btn").addEventListener("click", function() {
  const resultado = tirarDado(5);
  document.getElementById("resultadoDado").textContent = `Resultado del D5: ${resultado}`;
  
  const boton = this;
  const textoOriginal = boton.textContent;
  boton.textContent = "!boom!";
  boton.disabled = true; // Deshabilita el botón
  
  // Después de 1 segundo, restaura el texto original y habilita el botón
  setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.disabled = false; // Habilita el botón
  }, 1000);
});

document.getElementById("d10Btn").addEventListener("click", function() {
  const resultado = tirarDado(10);
  document.getElementById("resultadoDado").textContent = `Resultado del D10: ${resultado}`;
  
  const boton = this;
  const textoOriginal = boton.textContent;
  boton.textContent = "!boom!";
  boton.disabled = true;
  
  setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.disabled = false;
  }, 1000);
});

document.getElementById("d20Btn").addEventListener("click", function() {
  const resultado = tirarDado(20);
  document.getElementById("resultadoDado").textContent = `Resultado del D20: ${resultado}`;
  
  const boton = this;
  const textoOriginal = boton.textContent;
  boton.textContent = "!boom!";
  boton.disabled = true;
  
  setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.disabled = false;
  }, 1000);
});

document.getElementById("d100Btn").addEventListener("click", function() {
  const resultado = tirarDado(100);
  document.getElementById("resultadoDado").textContent = `Resultado del D100: ${resultado}`;
  
  const boton = this;
  const textoOriginal = boton.textContent;
  boton.textContent = "!boom!";
  boton.disabled = true;
  
  setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.disabled = false;
  }, 1000);
});

// Pedido de la lista desde el JSON
fetch("listas.json")
  .then(res => res.json())
  .then(response => {
    const itemsChicos = response.items_chicos;
    const itemsGrandes = response.items_grandes;
    const comidas = response.foods;
    const encuentros = response.encounters;

    function getRandomItem(array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }

    // Event listeners para los botones
    document.getElementById('itemChicoBtn').addEventListener('click', () => {
      const item = getRandomItem(itemsChicos);
      document.getElementById('resultado').textContent = `Ítem Chico: ${item}`;
    });

    document.getElementById('itemGrandeBtn').addEventListener('click', () => {
      const item = getRandomItem(itemsGrandes);
      document.getElementById('resultado').textContent = `Ítem Grande: ${item}`;
    });

    document.getElementById('comidaBtn').addEventListener('click', () => {
      const comida = getRandomItem(comidas);
      document.getElementById('resultado').innerHTML = `Comida: ${comida.name}.<br>Equivale a: ${comida.rations} raciones.`;
    });

    document.getElementById('encuentrosBtn').addEventListener('click', () => {
      const encounter1 = getRandomItem(encuentros);
      const encounter2 = getRandomItem(encuentros);
      document.getElementById('resultado').innerHTML = `Encuentro 1: ${encounter1.name}.<br>Encuentro 2: ${encounter2.name}.`;
    });
  })
  .catch(err => console.error('Error al cargar json:', err));
// Inicializa la interfaz cuando se carga la página
actualizarInterfaz();

