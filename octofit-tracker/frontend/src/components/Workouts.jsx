import { useEffect, useState } from 'react';
import { fetchResource } from '../lib/api';
import ResourceState from './ResourceState';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchResource(workoutsEndpoint).then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">Biblioteca</span><h1>Encuentra tu próximo reto</h1><p>Sesiones diseñadas para que avances con intención.</p></div><ResourceState {...state}><div className="data-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-top"><span className="tag">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.focus}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div></ResourceState></section>;
}