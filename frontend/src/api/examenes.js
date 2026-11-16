import client from './client'

// Funciones de acceso al recurso "exámenes" (ningún componente escribe la URL a mano)

export async function listarExamenes() {
  const { data } = await client.get('/examenes/')
  // La API puede devolver paginado {results:[...]} o un arreglo directo
  return Array.isArray(data) ? data : (data.results ?? [])
}

export async function crearExamen(examen) {
  const { data } = await client.post('/examenes/', examen)
  return data
}

export async function eliminarExamen(id) {
  await client.delete(`/examenes/${id}/`)
}
