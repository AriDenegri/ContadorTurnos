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

// Actualiza la interfaz con los turnos restantes y el estado del botón
function actualizarInterfaz() {
    turnosRestantesEl.textContent = `Turnos restantes: ${turnosRestantes}`;
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

// Inicializa la interfaz cuando se carga la página
actualizarInterfaz();

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
