import { Link } from 'react-router';

function NoEncontrada() {
  return (
    <section>
      <h1>404</h1>
      <p>No encontramos esa página.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NoEncontrada;
