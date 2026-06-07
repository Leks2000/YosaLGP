/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Номер счётчика Яндекс.Метрики, напр. "99887766" */
  readonly VITE_YM_ID?: string;
  /** Measurement ID Google Analytics 4, напр. "G-XXXXXXXXXX" */
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}
