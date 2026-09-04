import fs from 'node:fs';

/**
 * FORMA ANTIGUA: Usando callbacks
 * 
 * El problema: "Callback Hell"
 * - El código es difícil de leer
 * - Los errores se manejan de forma inconsistente
 * - Es fácil perder el contexto
 */
function leerTurnosConCallback() {
  fs.readFile('./data/turnos.json', 'utf-8', (error, contenido) => {
    if (error) {
      console.error('Error al leer el archivo:', error);
      return;
    }
    try {
      const turnos = JSON.parse(contenido);
      console.log('Turnos leídos con callback:');
      console.log(turnos);
    } catch (parseError) {
      console.error('Error al parsear JSON:', parseError);
    }
  });
}

/**
 * FORMA MODERNA: Usando async/await (que usamos en index.ts)
 * 
 * Las ventajas:
 * - Código secuencial y fácil de leer
 * - Los errores se manejan en un único try/catch
 * - Es más fácil de mantener y depurar
 */
async function leerTurnosConAsyncAwait() {
  try {
    const contenido = await fs.promises.readFile('./data/turnos.json', 'utf-8');
    const turnos = JSON.parse(contenido);
    console.log('Turnos leídos con async/await:');
    console.log(turnos);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
  }
}

// Comentado: descomentar solo para probar
// leerTurnosConCallback();
// await leerTurnosConAsyncAwait();