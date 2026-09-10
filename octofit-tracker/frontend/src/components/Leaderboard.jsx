import { useEffect, useState } from 'react';
import { fetchResource } from '../lib/api';
import ResourceState from './ResourceState';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchResource(leaderboardEndpoint).then(setEntries).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">Leaderboard</span><h1>La motivación se contagia</h1><p>Reconoce el esfuerzo, celebra el progreso y vuelve a intentarlo.</p></div><ResourceState {...state}><div className="ranking-list">{entries.map((entry) => <article className={`ranking-row rank-${entry.rank}`} key={entry._id}><span className="rank-number">{String(entry.rank).padStart(2, '0')}</span><div><h2>{entry.user?.name || 'Atleta'}</h2><p>{entry.team?.name || 'Equipo'}</p></div><strong>{entry.points}<small> pts</small></strong></article>)}</div></ResourceState></section>;
}