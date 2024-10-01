// Función para cargar los datos de traducción
async function cargarTraducciones(idioma) {
    const respuesta = await fetch(`./assets/translate/${idioma}.json`);
    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar el archivo de traducciones: ${idioma}`);
    }
    const traducciones = await respuesta.json();
    return traducciones;
  }
  
  // Función para actualizar el contenido de la página
  function actualizarContenido(traducciones) {
    const elementos = document.querySelectorAll('[data-traduccion]');
    elementos.forEach(elemento => {
      const id = elemento.dataset.traduccion;
      elemento.textContent = traducciones[id];
    });
  }
  
  // Función para cambiar el idioma
  async function cambiarIdioma(idioma) {
    try {
      const traducciones = await cargarTraducciones(idioma);
      actualizarContenido(traducciones);
    } catch (error) {
      console.error(error);
    }
  }

// Idioma por defecto (ajusta esto según tu preferencia)
const idiomaPorDefecto = 'es';

// Cargar las traducciones del idioma por defecto al inicio
cargarTraducciones(idiomaPorDefecto)
  .then(traducciones => {
    actualizarContenido(traducciones);
    // Actualizar el select al inicio
    const selectorIdioma = document.getElementById('idioma');
    selectorIdioma.value = idiomaPorDefecto;
    document.documentElement.lang = idiomaPorDefecto;
  })
  .catch(error => console.error(error));
  
  // Evento de cambio de idioma
  const selectorIdioma = document.getElementById('idioma');
  selectorIdioma.addEventListener('change', () => {
    const idiomaSeleccionado = selectorIdioma.value;
    cambiarIdioma(idiomaSeleccionado);
  });