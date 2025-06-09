import { useEffect, useState } from "react";
import axios from "axios";

interface Entrada {
  id: string;
  contenido: string;
  categoria: string;
  fechaCreacion: string;
}

export default function LeerEntradas() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarEntradas = async () => {
      try {
        const res = await axios.get("http://localhost:4000/entradas");
        setEntradas(res.data.reverse()); // mostrar las más recientes primero
      } catch (error) {
        setMensaje("Error al cargar las entradas.");
      }
    };

    cargarEntradas();
  }, []);

  const guardarEnRefugio = (id: string) => {
    const actuales = JSON.parse(localStorage.getItem("refugio-arkhe") || "[]");
    if (!actuales.includes(id)) {
      actuales.push(id);
      localStorage.setItem("refugio-arkhe", JSON.stringify(actuales));
      alert("Entrada guardada en tu refugio personal.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", textAlign: "left" }}>
      <h2>📖 Lectura de Entradas</h2>
      {mensaje && <p>{mensaje}</p>}
      {entradas.map((entrada) => (
        <div
          key={entrada.id}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <p>
            <strong>
              🗓️ {new Date(entrada.fechaCreacion).toLocaleString()}
            </strong>
          </p>
          <p>
            <strong>🎭 Emoción:</strong> {entrada.categoria}
          </p>
          <p style={{ marginTop: "0.5rem" }}>{entrada.contenido}</p>

          {/* 🔽 Agrega este botón aquí */}
          <button
            onClick={() => guardarEnRefugio(entrada.id)}
            style={{ marginTop: "0.5rem" }}
          >
            🌿 Guardar en mi refugio
          </button>
        </div>
      ))}
    </div>
  );
}
