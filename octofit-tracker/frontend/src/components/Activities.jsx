import { useEffect, useState } from 'react';
import { displayDate, fetchResource } from '../lib/api';
import ResourceState from './ResourceState';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchResource(activitiesEndpoint).then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">Actividad reciente</span><h1>Cada sesión cuenta</h1><p>Una vista clara del trabajo que mantiene a la comunidad en marcha.</p></div><ResourceState {...state}><div className="table-wrap"><table><thead><tr><th>Persona</th><th>Actividad</th><th>Duración</th><th>Calorías</th><th>Fecha</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td>{activity.user?.name || 'Usuario'}</td><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.calories} kcal</td><td>{displayDate(activity.completedAt)}</td></tr>)}</tbody></table></div></ResourceState></section>;
}