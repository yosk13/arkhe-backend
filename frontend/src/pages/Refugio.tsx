import { useEffect, useState } from 'react';
import axios from 'axios';

interface Entrada {
  id: string;
  contenido: string;
  categoria: string;
  fechaCreacion: string;
}

export default function Refugio() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  useEffect(() => {
    const cargarRefugio = async () => {
      const guardadas: string[] = JSON.parse(localStorage.getItem('refugio-arkhe') || '[]');
      if (guardadas.length === 0) return;

      try {
        const res = await axios.get('http://localhost:4000/entradas');
        const todas: Entrada[] = res.data;
        const filtradas = todas.filter(e => guardadas.includes(e.id));
        setEntradas(filtradas);
      } catch (error) {
        console.error('Error al cargar las entradas del refugio.');
      }
    };

    cargarRefugio();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', textAlign: 'left' }}>
      <h2>🌙 Mi Refugio Personal</h2>
      {entradas.length === 0 ? (
        <p>No has guardado ninguna entrada aún.</p>
      ) : (
        entradas.map((entrada) => (
          <div key={entrada.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '1rem' }}>
            <p><strong>🗓️ {new Date(entrada.fechaCreacion).toLocaleString()}</strong></p>
            <p><strong>🎭 Emoción:</strong> {entrada.categoria}</p>
            <p style={{ marginTop: '0.5rem' }}>{entrada.contenido}</p>
          </div>
        ))
      )}
    </div>
  );
}
