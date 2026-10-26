import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { obtenerRecetas } from '../api';

function Inicio() {
  const [destacada, setDestacada] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    obtenerRecetas(controller.signal)
      .then((recetas) => setDestacada(recetas[0]))
      .catch((error) => {
        if (error.name !== 'AbortError') console.error(error);
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="inicio">
      <h1>Recetas de la casa</h1>
      <p>Las recetas de siempre, para hacerlas con calma.</p>

      {destacada ? (
        <div className="destacada">
          <h2>Receta de la semana: {destacada.nombre}</h2>
          <p>Por {destacada.autor.nombre}</p>
          <Link to={`/recetas/${destacada.id}`}>Ver la receta</Link>
        </div>
      ) : (
        <p>Cargando la receta de la semana…</p>
      )}

      <Link className="boton" to="/recetas">Ver todas las recetas</Link>
    </section>
  );
}

export default Inicio;
