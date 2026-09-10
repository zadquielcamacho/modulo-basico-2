const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const apiUrl = (resource) => `${apiBaseUrl}/api/${resource}/`;

export const responseItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  return [];
};

export async function fetchResource(resource) {
  const response = await fetch(apiUrl(resource));
  if (!response.ok) throw new Error(`No se pudo cargar ${resource} (${response.status})`);
  return responseItems(await response.json());
}

export function displayDate(value) {
  if (!value) return 'Sin fecha';
  return new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(value));
}