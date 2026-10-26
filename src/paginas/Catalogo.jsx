import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { obtenerRecetas } from '../api';
import TarjetaReceta from '../components/TarjetaReceta';

const CATEGORIAS = ['todas', 'desayuno', 'almuerzo', 'acompañamiento', 'postre'];

function Catalogo({ propias }) {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoria = searchParams.get('categoria') ?? 'todas';

  useEffect(() => {
    const controller = new AbortController();

    obtenerRecetas(controller.signal)
      .then((datos) => {
        setRecetas(datos);
        setCargando(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setError(error.message);
        setCargando(false);
      });

    return () => controller.abort();
  }, []);

  const todas = [...recetas, ...propias];
  const visibles =
    categoria === 'todas' ? todas : todas.filter((r) => r.categoria === categoria);

  function cambiarCategoria(e) {
    const valor = e.target.value;
    if (valor === 'todas') setSearchParams({});
    else setSearchParams({ categoria: valor });
  }

  if (error) return <p className="error">{error}</p>;
  if (cargando) return <p>Cargando recetas…</p>;

  return (
    <section>
      <h1>Recetas</h1>

      <label>
        Categoría{' '}
        <select value={categoria} onChange={cambiarCategoria}>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <p>Mostrando {visibles.length} recetas</p>

      <div className="grilla">
        {visibles.map((receta) => (
          <TarjetaReceta key={receta.id} receta={receta} />
        ))}
      </div>
    </section>
  );
}

export default Catalogo;
