/**
 * Ajustes del sitio que el equipo puede cambiar sin tocar el resto del código.
 */
export const SITE = {
  /** Video del proyecto, servido desde public/video. */
  videoFile: 'video/wiro.mp4',
  videoPoster: 'video/poster.jpg',
  /** Alternativa: enlace de inserción (YouTube: https://www.youtube.com/embed/ID). Si está lleno, se usa en lugar del archivo. */
  videoEmbedUrl: '',
  /** Carpeta con los diseños y documentos de la innovación (OneDrive, Drive...). Vacío = "enlace próximamente". */
  filesUrl:
    'https://unbosqueeduco-my.sharepoint.com/:f:/r/personal/spinzonv_unbosque_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fspinzonv%5Funbosque%5Fedu%5Fco%2FDocuments%2FWIRO%20%2D%20GRUPO%206&share=cgq8fQQEVX%2D%2DQJ7sL8TSnPApEgUCZfpW8AJPkFQKK1kiwbySlg',
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
