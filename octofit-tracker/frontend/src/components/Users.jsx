import { useEffect, useState } from 'react';
import { fetchResource } from '../lib/api';
import ResourceState from './ResourceState';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchResource(usersEndpoint).then(setUsers).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">Comunidad</span><h1>Personas en movimiento</h1><p>Conoce a quienes están construyendo hábitos sostenibles.</p></div><ResourceState {...state}><div className="data-grid">{users.map((user) => <article className="data-card" key={user._id || user.email}><div className="avatar">{user.name?.charAt(0) || '?'}</div><div><h2>{user.name}</h2><p>{user.email}</p><span className="tag">{user.goal}</span></div></article>)}</div></ResourceState></section>;
}