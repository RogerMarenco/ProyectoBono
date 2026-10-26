import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import Navegacion from './components/Navegacion';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Detalle from './paginas/Detalle';
import Favoritos from './paginas/Favoritos';
import NuevaReceta from './paginas/NuevaReceta';
import NoEncontrada from './paginas/NoEncontrada';

function leerFavoritos() {
  const guardados = localStorage.getItem('favoritos');

  if (!guardados) {
    return [];
  }

  try {
    return JSON.parse(guardados);
  } catch {
    return [];
  }
}

function leerRecetasPropias() {
  const guardadas = localStorage.getItem('recetasPropias');

  if (!guardadas) {
    return [];
  }

  try {
    return JSON.parse(guardadas);
  } catch {
    return [];
  }
}

function App() {
  const [favoritos, setFavoritos] = useState(leerFavoritos);
  const [propias, setPropias] = useState(leerRecetasPropias);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem('recetasPropias', JSON.stringify(propias));
  }, [propias]);

  function toggleFavorito(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  function agregarReceta(receta) {
    setPropias([...propias, receta]);
  }

  return (
    <div className="app">
      <Navegacion totalFavoritos={favoritos.length} />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recetas" element={<Catalogo propias={propias} />} />
          <Route path="/recetas/:id" element={ <Detalle propias={propias} favoritos={favoritos} onToggleFavorito={toggleFavorito} />} />
          <Route path="/favoritos" element={ <Favoritos favoritos={favoritos} propias={propias} onQuitar={toggleFavorito} />} />
          <Route path="/nueva" element={<NuevaReceta onAgregar={agregarReceta} />} />
          <Route path="/404" element={<NoEncontrada />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;