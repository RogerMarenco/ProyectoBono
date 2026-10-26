export async function obtenerRecetas(signal) {
  const res = await fetch('/data/recetas.json', { signal });
  if (!res.ok) throw new Error('No se pudieron cargar las recetas');
  return res.json();
}

export async function obtenerReceta(id, signal) {
  const recetas = await obtenerRecetas(signal);
  return recetas.find((receta) => receta.id === Number(id));
}
