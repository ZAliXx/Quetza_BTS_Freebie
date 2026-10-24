import { Link, Route, Routes } from 'react-router-dom'
import Menu from './pages/Menu'
import CrosswordPage from './pages/CrosswordPage'
import './App.css'

function Soon({ title }: { title: string }) {
  return (
    <main className="screen screen--menu">
      <div className="menu">
        <h1>{title}</h1>
        <p className="menu-note">Próximamente…</p>
        <Link className="menu-btn" to="/">
          Volver al menú
        </Link>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/crucigrama" element={<CrosswordPage />} />
      <Route path="/memorama" element={<Soon title="Memorama" />} />
    </Routes>
  )
}