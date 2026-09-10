import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { path: '/activities', label: 'Actividad', icon: '↗' },
  { path: '/leaderboard', label: 'Ranking', icon: '◎' },
  { path: '/teams', label: 'Equipos', icon: '◈' },
  { path: '/users', label: 'Personas', icon: '◌' },
  { path: '/workouts', label: 'Workouts', icon: '✦' },
]

function App() {
  const location = useLocation()
  const current = navigation.find((item) => location.pathname.startsWith(item.path)) || navigation[0]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/activities"><span className="brand-mark">O</span><span>octofit<small>TRACKER</small></span></NavLink>
        <div className="side-label">Tu espacio</div>
        <nav aria-label="Navegación principal">{navigation.map((item) => <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} key={item.path} to={item.path}><span>{item.icon}</span>{item.label}</NavLink>)}</nav>
        <div className="sidebar-foot"><span className="pulse-dot" />API conectada<br /><small>Datos en tiempo real</small></div>
      </aside>
      <main className="main-content"><header className="topbar"><div><span className="crumb">Octofit / {current.label}</span><p className="status-line"><span className="status-dot" />Tu progreso, a tu ritmo</p></div><div className="date-stamp">2026 <strong>SEP</strong></div></header><Routes><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/activities" replace />} /></Routes></main>
    </div>
  )
}

export default App
