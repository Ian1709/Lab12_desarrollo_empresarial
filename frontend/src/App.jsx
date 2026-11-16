import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ExamenesList from './pages/ExamenesList.jsx'
import ExamenForm from './pages/ExamenForm.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="container header-inner">
            <Link to="/" className="brand">Lab 12 · Exámenes</Link>
            <nav className="nav">
              <Link to="/">Listado</Link>
              <Link to="/nuevo">Nuevo examen</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ExamenesList />} />
            <Route path="/nuevo" element={<ExamenForm />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="container">Consumo de API Django con React + Axios</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App

