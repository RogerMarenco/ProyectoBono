import { useState } from 'react';
import { useNavigate } from 'react-router';

const VACIO = { nombre: '', categoria: 'almuerzo', tiempo: '' };

function NuevaReceta({ onAgregar }) {
  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (form.nombre.trim() === '') {
      setError('La receta necesita un nombre.');
      return;
    }
    if (!(Number(form.tiempo) > 0)) {
      setError('El tiempo debe ser un número mayor que cero.');
      return;
    }

    onAgregar({
      id: Date.now(),
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      tiempo: Number(form.tiempo),
    });
    navigate('/recetas');
  }

  return (
    <section>
      <h1>Nueva receta</h1>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <label>
          Nombre
          <input
            value={form.nombre}
            onChange={(e) => setForm((anterior) => ({ ...anterior, nombre: e.target.value }))}
          />
        </label>

        <label>
          Categoría
          <select
            value={form.categoria}
            onChange={(e) => setForm((anterior) => ({ ...anterior, categoria: e.target.value }))}
          >
            <option value="desayuno">desayuno</option>
            <option value="almuerzo">almuerzo</option>
            <option value="acompañamiento">acompañamiento</option>
            <option value="postre">postre</option>
          </select>
        </label>

        <label>
          Tiempo (minutos)
          <input
            type="number"
            value={form.tiempo}
            onChange={(e) => setForm((anterior) => ({ ...anterior, tiempo: e.target.value }))}
          />
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <button type="submit">Guardar receta</button>
      </form>
    </section>
  );
}

export default NuevaReceta;
