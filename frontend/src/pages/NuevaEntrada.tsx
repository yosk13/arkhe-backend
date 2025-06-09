import { useState } from "react";
import axios from "axios";

const emociones = [
  "dolor",
  "amor",
  "miedo",
  "esperanza",
  "duda",
  "soledad",
  "alegría",
  "gratitud",
  "reflexión",
  "inexplicable",
];

export default function NuevaEntrada() {
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarEntrada = async () => {
    if (!contenido || !categoria) {
      setMensaje("Por favor, escribe algo y elige una emoción.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/entradas`, {
        contenido,
        categoria,
      });

      setMensaje("🕯️ Entrada guardada para siempre.");
      setContenido("");
      setCategoria("");
    } catch (error) {
      setMensaje("Hubo un error al guardar tu entrada.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <h2>🕯️ Dejar una entrada en Arkhé</h2>
      <textarea
        rows={6}
        placeholder="Escribe con el alma..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        style={{ width: "100%", padding: "1rem", marginTop: "1rem" }}
      />
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        style={{ width: "100%", marginTop: "1rem", padding: "0.5rem" }}
      >
        <option value="">Selecciona una emoción...</option>
        {emociones.map((emo) => (
          <option key={emo} value={emo}>
            {emo}
          </option>
        ))}
      </select>
      <button
        onClick={enviarEntrada}
        style={{ marginTop: "1rem", padding: "0.75rem 2rem" }}
      >
        Enviar
      </button>
      {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
    </div>
  );
}
