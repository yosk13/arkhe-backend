import express, { Request, Response } from "express";
import { Archivo } from "../storage/archivo";
import { EntradaArkhé } from "../models/Entrada";
import { CategoriaEmocional } from '../models/Entrada';
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  const entradas = Archivo.obtener();
  res.json(entradas);
});

router.post("/", (req: Request, res: Response) => {
  const { contenido, categoria } = req.body;

  if (typeof contenido !== 'string' || typeof categoria !== 'string') {
    return res.status(400).json({ mensaje: 'Contenido y categoría deben ser textos.' });
  }

  const categoriasValidas = [
    'dolor', 'amor', 'miedo', 'esperanza', 'duda',
    'soledad', 'alegría', 'gratitud', 'reflexión', 'inexplicable'
  ] as const;
  
  if (!categoriasValidas.includes(categoria.trim().toLowerCase() as any)) {
    return res.status(400).json({ mensaje: 'Categoría no válida.' });
  }

  const nueva: EntradaArkhé = {
    id: uuidv4(),
    contenido: contenido.trim(),
    categoria: categoria.trim().toLowerCase() as CategoriaEmocional,
    fechaCreacion: new Date().toISOString(),
  };

  Archivo.guardar(nueva);
  res.status(201).json({ mensaje: "Entrada guardada.", entrada: nueva });
});

export default router;
