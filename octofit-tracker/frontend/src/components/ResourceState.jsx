export default function ResourceState({ loading, error, children }) {
  if (loading) return <div className="state-message">Cargando datos...</div>;
  if (error) return <div className="state-message state-error" role="alert">{error}</div>;
  return children;
}