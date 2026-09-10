import { useEffect, useState } from 'react';
import { fetchResource } from '../lib/api';
import ResourceState from './ResourceState';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchResource(teamsEndpoint).then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">Equipos</span><h1>Entrenar juntos cambia el ritmo</h1><p>Grupos que convierten la constancia en energía compartida.</p></div><ResourceState {...state}><div className="data-grid">{teams.map((team) => <article className="data-card team-card" key={team._id || team.name}><div className="team-mark">{team.name?.slice(0, 2).toUpperCase()}</div><div><h2>{team.name}</h2><p>{team.sport}</p><span className="tag">{team.members?.length || 0} integrantes</span></div></article>)}</div></ResourceState></section>;
}