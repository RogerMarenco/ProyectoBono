import { Link } from 'react-router';

function TarjetaReceta({ receta }) {
  return (
    <article className="tarjeta">
      <span className="etiqueta">{receta.categoria}</span>
      <h3>
        <Link to={`/recetas/${receta.id}`}>{receta.nombre}</Link>
      </h3>
      <p>⏱️ {receta.tiempo} min</p>
    </article>
  );
}

export default TarjetaReceta;
