/**
 * @file helpers.ts
 * @description Funciones de utilidad compartidas en el frontend para el formateo de datos,
 * manipulación de cadenas de texto e interacción con la API del portapapeles.
 */

/**
 * Normaliza el formato de periodos laborales y académicos.
 * 
 * @description
 * **Qué hace:** Convierte periodos de fecha (meses o rangos) en español al inglés si se solicita
 * el idioma inglés, manteniendo el string original en caso contrario.
 * 
 * **Cómo lo hace:** Utiliza un diccionario de mapeo estático para meses clave y rangos de fecha predefinidos,
 * ejecutando un reemplazo basado en expresiones regulares sobre el string de entrada.
 * 
 * **Qué recibe (Inputs):**
 * - `period` (string): El texto original del periodo en español (ej. "Julio 2025 – Marzo 2026").
 * - `lang` (string, opcional): El código del idioma destino ("es" o "en"). Por defecto es "es".
 * 
 * **Cómo lo envía (Outputs):**
 * - (string): El periodo formateado y traducido (si lang es "en") o sin alterar.
 * 
 * **Qué soluciona:** Evita que el frontend renderice texto mixto (fechas en español cuando la interfaz
 * está en inglés) al consumir la base de datos que está guardada en español.
 * 
 * **Ejemplo de uso:**
 * ```typescript
 * const enPeriod = formatPeriod("Julio 2025 – Marzo 2026", "en");
 * // Devuelve: "July 2025 – March 2026"
 * ```
 */
export const formatPeriod = (period: string, lang: string = 'es'): string => {
  if (!period) return '';
  let result = period;
  if (lang === 'en') {
    const translations: Record<string, string> = {
      'Julio': 'July',
      'Marzo': 'March',
      'Abril': 'April',
      'Mayo': 'May',
      'Julio 2025 – Marzo 2026': 'July 2025 – March 2026',
      'Abril 2024 – Mayo 2025': 'April 2024 – May 2025',
      'En curso': 'In progress'
    };
    Object.entries(translations).forEach(([key, value]) => {
      result = result.replace(new RegExp(key, 'g'), value);
    });
  }
  return result;
};

/**
 * Convierte un periodo en texto (ej. "Julio 2025 – Marzo 2026") en un objeto Date
 * correspondiente a la fecha de inicio para poder ordenar cronológicamente.
 */
export const parsePeriodToDate = (period: string): Date => {
  if (!period) return new Date(0);
  
  const startPart = period.split(/[-–—/]/)[0].trim().toLowerCase();
  
  const yearMatch = startPart.match(/\b(20\d{2}|19\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 1970;
  
  const monthsEs = ['ener', 'febr', 'marz', 'abril', 'mayo', 'jun', 'jul', 'agos', 'sept', 'oct', 'nov', 'dic'];
  const monthsEn = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  
  let monthIndex = 0;
  for (let i = 0; i < 12; i++) {
    if (startPart.includes(monthsEs[i]) || startPart.includes(monthsEn[i])) {
      monthIndex = i;
      break;
    }
  }
  
  return new Date(year, monthIndex, 1);
};

/**
 * Genera slugs seguros para navegación y URLs.
 * 
 * @description
 * **Qué hace:** Convierte un string arbitrario (como el título de un proyecto) en un formato seguro para ser
 * utilizado en rutas de navegador (slug).
 * 
 * **Cómo lo hace:** Convierte a minúsculas, remueve acentos y diacríticos mediante descomposición unicode,
 * reemplaza espacios por guiones y elimina cualquier carácter que no sea alfanumérico o guión.
 * 
 * **Qué recibe (Inputs):**
 * - `text` (string): La cadena de texto de entrada (ej. "Marketify: SaaS E-commerce").
 * 
 * **Cómo lo envía (Outputs):**
 * - (string): El slug limpio (ej. "marketify-saas-e-commerce").
 * 
 * **Qué soluciona:** Evita errores de codificación de caracteres en las URLs del navegador y unifica
 * las claves para realizar routing estático en Astro (`/proyectos/[slug]`).
 * 
 * **Ejemplo de uso:**
 * ```typescript
 * const slug = slugify("Marketify: SaaS E-commerce");
 * // Devuelve: "marketify-saas-e-commerce"
 * ```
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normaliza acentos
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos
    .replace(/\-\-+/g, '-'); // Reemplaza guiones múltiples
};

/**
 * Convierte cadenas de tecnologías en arrays limpios.
 * 
 * @description
 * **Qué hace:** Normaliza el formato del stack tecnológico de un proyecto pasándolo a una lista estructurada.
 * 
 * **Cómo lo hace:** Comprueba si la entrada ya es un array. Si es una cadena, la divide usando comas
 * como delimitadores, limpia los espacios en blanco adicionales y descarta valores vacíos.
 * 
 * **Qué recibe (Inputs):**
 * - `tech` (string | string[]): Cadena separada por comas o array de tecnologías.
 * 
 * **Cómo lo envía (Outputs):**
 * - (string[]): Una lista de nombres de tecnologías normalizados.
 * 
 * **Qué soluciona:** Previene errores de ejecución al intentar iterar sobre stacks tecnológicos que vienen
 * de la base de datos como strings de texto plano en lugar de colecciones indexadas.
 * 
 * **Ejemplo de uso:**
 * ```typescript
 * const tags = parseTechStack("React, Node.js, Docker");
 * // Devuelve: ["React", "Node.js", "Docker"]
 * ```
 */
export const parseTechStack = (tech: string | string[]): string[] => {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech.split(',').map((s) => s.trim()).filter(Boolean);
};

/**
 * Copia texto de manera asíncrona al portapapeles.
 * 
 * @description
 * **Qué hace:** Copia una cadena de texto seleccionada al portapapeles del sistema operativo de forma asíncrona.
 * 
 * **Cómo lo hace:** Utiliza la API asíncrona moderna `navigator.clipboard.writeText`. En caso de fallo o
 * ausencia de soporte en el navegador, registra el error en la consola y retorna falso.
 * 
 * **Qué recibe (Inputs):**
 * - `text` (string): El texto que se desea copiar.
 * 
 * **Cómo lo envía (Outputs):**
 * - (Promise<boolean>): Una promesa que resuelve a verdadero si el copiado fue exitoso, o falso en caso contrario.
 * 
 * **Qué soluciona:** Proporciona un mecanismo robusto y de alto nivel para permitir al usuario copiar
 * su dirección de correo electrónico con un solo clic, mejorando el UX sin bloquear el hilo principal.
 * 
 * **Ejemplo de uso:**
 * ```typescript
 * const success = await copyToClipboard("andreyyeisonmg@gmail.com");
 * // Si copia con éxito: true
 * ```
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
};
