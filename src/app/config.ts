/**
 * Ajustes del sitio que el equipo puede cambiar sin tocar el resto del código.
 */
export const SITE = {
  /** Enlace de inserción del video (YouTube: https://www.youtube.com/embed/ID). Vacío = se muestra el aviso de estreno. */
  videoEmbedUrl: '',
  /** Carpeta con los diseños y documentos de la innovación (OneDrive, Drive...). Vacío = "enlace próximamente". */
  filesUrl: '',
  /** Meta de la campaña en dólares. */
  goalUsd: 50000,
  /** Lo recaudado: la página no cobra, así que siempre es 0. */
  pledgedUsd: 0,
  team: [
    'Nicolás Espinosa Estrada',
    'Hernando Javier García Mogollón',
    'David Felipe Millán Castañeda',
    'Santiago Pinzón Vásquez',
  ],
};
