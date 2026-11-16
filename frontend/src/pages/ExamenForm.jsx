import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { crearExamen } from '../api/examenes'

function extraerMensajeApi(data) {
  if (!data) return 'Error de validación.'
  if (typeof data === 'string') return data
  if (data.detail) return data.detail
  // DRF suele devolver {campo: ["mensaje", ...]}
  return Object.entries(data)
    .map(([campo, msgs]) => {
      const texto = Array.isArray(msgs) ? msgs.join(', ') : String(msgs)
      return `${campo}: ${texto}`
    })
    .join(' | ')
}

export default function ExamenForm() {
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [activo, setActivo] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [errorApi, setErrorApi] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault() // evita el envío del navegador
    setEnviando(true)
    setErrorApi(null)
    try {
      await crearExamen({ titulo, descripcion, activo })
      navigate('/') // navegación al listado al terminar
    } catch (err) {
      if (err.response) {
        setErrorApi(extraerMensajeApi(err.response.data))
      } else {
        setErrorApi('No se pudo conectar con el servidor.')
      }
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="section">
      <div className="container narrow">
        <h1 className="section-title">Nuevo examen</h1>
        <form className="form-card" onSubmit={handleSubmit}>
          <label className="field">
            <span>Título *</span>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título del examen"
            />
          </label>

          <label className="field">
            <span>Descripción</span>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción (opcional)"
              rows={3}
            />
          </label>

          <label className="field field-check">
            <input
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            <span>Activo</span>
          </label>

          {errorApi && (
            <div className="state state-error" role="alert">
              <p><strong>Error de la API:</strong> {errorApi}</p>
            </div>
          )}

          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={enviando}>
              {enviando ? 'Guardando...' : 'Guardar'}
            </button>
            <Link className="btn" to="/">Cancelar</Link>
          </div>
        </form>
      </div>
    </section>
  )
}
