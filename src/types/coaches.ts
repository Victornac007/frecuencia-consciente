/**
 * Contrato de datos para Coaches.
 * El backend debe devolver/aceptar estas estructuras.
 * Endpoints: GET /coaches, POST /coaches, PUT /coaches/:id, DELETE /coaches/:id
 */

export interface CoachDTO {
  id: string;
  name: string;
  /** Ej. "Instructor de Yoga", "Coach de Vida & Meditación" */
  role: string;
  bio: string;
  imageUrl: string;
  /** Valor promedio para mostrar estrellas (ej. 4.5) */
  rating: number;
  /** Número de reseñas (para mostrar junto a las estrellas) */
  reviewCount: number;
  /** Especialidades; determinan los filtros en la vista pública */
  specialties: string[];
  /** Opcional; para enlace a perfil social */
  instagramHandle?: string;
}

export type CoachCreateDTO = Omit<CoachDTO, "id">;
export type CoachUpdateDTO = Partial<Omit<CoachDTO, "id">>;
