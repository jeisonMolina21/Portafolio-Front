import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPeriod, slugify, parseTechStack, parsePeriodToDate } from './helpers.ts';

test('slugify - convierte títulos a slugs seguros', () => {
  assert.equal(slugify('Sistema de Carnetización Digital'), 'sistema-de-carnetizacion-digital');
  assert.equal(slugify('Proyecto Kairós: Biometría & Python'), 'proyecto-kairos-biometria-python');
});

test('parseTechStack - convierte cadenas separadas por coma en arreglos', () => {
  const result = parseTechStack('React, Node.js, Express, MySQL');
  assert.deepEqual(result, ['React', 'Node.js', 'Express', 'MySQL']);
});

test('formatPeriod - traduce meses si lang es "en"', () => {
  const resultEn = formatPeriod('Julio 2025 – Marzo 2026', 'en');
  assert.equal(resultEn, 'July 2025 – March 2026');

  const resultEs = formatPeriod('Julio 2025 – Marzo 2026', 'es');
  assert.equal(resultEs, 'Julio 2025 – Marzo 2026');
});

test('parsePeriodToDate - analiza fechas para ordenamiento', () => {
  const date = parsePeriodToDate('Julio 2025 – Marzo 2026');
  assert.equal(date.getFullYear(), 2025);
  assert.equal(date.getMonth(), 6); // Julio is index 6
});
