import fs from 'fs';
import path from 'path';
import { EntradaArkhé } from '../models/Entrada';

const RUTA = path.resolve(__dirname, '../../data/arkhe.entries.json');

export class Archivo {
  static obtener(): EntradaArkhé[] {
    if (!fs.existsSync(RUTA)) return [];
    const contenido = fs.readFileSync(RUTA, 'utf-8');
    return JSON.parse(contenido) as EntradaArkhé[];
  }

  static guardar(nueva: EntradaArkhé): void {
    const actuales = this.obtener();
    actuales.push(nueva);
    fs.writeFileSync(RUTA, JSON.stringify(actuales, null, 2), 'utf-8');
  }
}
