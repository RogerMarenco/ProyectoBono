import { NavLink } from 'react-router';

function Navegacion({ totalFavoritos }) {
  return (
    <header className="navegacion">
      <span className="logo">🍲 Recetario</span>
      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/recetas">Recetas</NavLink>
        <NavLink to="/favoritos">
          Favoritos
          {totalFavoritos > 0 && (<span className="contador">{totalFavoritos}</span>)}
        </NavLink>
        <NavLink to="/nueva">Nueva receta</NavLink>
      </nav>
    </header>
  );
}

export default Navegacion;
