export type CategoriaEmocional =
  | 'dolor' | 'amor' | 'miedo' | 'esperanza' | 'duda'
  | 'soledad' | 'alegría' | 'gratitud' | 'reflexión' | 'inexplicable';

export interface EntradaArkhé {
  id: string;
  contenido: string;
  categoria: CategoriaEmocional;
  fechaCreacion: string;
}
