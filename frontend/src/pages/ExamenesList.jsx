import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { eliminarExamen, listarExamenes } from '../api/examenes'

export default function ExamenesList() {
  const [examenes, setExamenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const cargar = async () => {
    setCargando(true)
    setError(null)
    try {
      const datos = await listarExamenes()
      setExamenes(datos)
    } catch (err) {
      const mensaje = err.response
        ? `Error ${err.response.status}: no se pudo obtener la lista de exámenes.`
        : 'No se pudo conectar con el servidor. Verifica que la API esté en ejecución.'
      setError(mensaje)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  const handleEliminar = async (id) => {
    try {
      await eliminarExamen(id)
      await cargar() // refresca la lista al terminar
    } catch (err) {
      const mensaje = err.response
        ? `No se pudo eliminar (error ${err.response.status}).`
        : 'No se pudo conectar con el servidor.'
      setError(mensaje)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">Listado de exámenes</h1>
          <Link className="btn btn-primary" to="/nuevo">Nuevo examen</Link>
        </div>

        {cargando && (
          <div className="state state-loading" role="status">
            <p>Cargando exámenes...</p>
            <div className="skeleton-table" aria-hidden="true">
              <div className="skeleton-row" />
              <div className="skeleton-row" />
              <div className="skeleton-row" />
            </div>
          </div>
        )}

        {!cargando && error && (
          <div className="state state-error" role="alert">
            <p>{error}</p>
            <button className="btn" type="button" onClick={cargar}>Reintentar</button>
          </div>
        )}

        {!cargando && !error && (
          <div className="table-wrap">
            {examenes.length === 0 ? (
              <p className="muted">No hay exámenes registrados.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Activo</th>
                    <th>Preguntas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {examenes.map((ex) => (
                    <tr key={ex.id}>
                      <td>{ex.id}</td>
                      <td>{ex.titulo}</td>
                      <td>{ex.descripcion || '—'}</td>
                      <td>{ex.activo ? 'Sí' : 'No'}</td>
                      <td>{ex.question_count ?? 0}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handleEliminar(ex.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
