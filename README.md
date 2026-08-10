# Colectivo Raya

Galería virtual de arte — pieza de portafolio frontend-only donde cada
ilustrador puede mostrar su portafolio con proyectos individuales, marcos
decorativos opcionales, zoom de imágenes y una demo de creación de
portafolio por drag & drop.

No hay backend ni base de datos: todos los datos (artistas, proyectos,
imágenes) viven hardcodeados en el código como un sitio 100% estático.

## Créditos

Las ilustraciones mostradas son obra real de:

- **José Gutierrez** — [@jgut.art](https://www.instagram.com/jgut.art/)
- **Brenda Villanueva** — [@mo.ilustra](https://www.instagram.com/mo.ilustra/)

Usadas en este proyecto de portafolio con su permiso.

## Estructura

- `ilustraciones-jose/`, `ilustraciones-brenda/` — assets originales (fuente),
  no se importan directamente en la app.
- `scripts/optimize-images.mjs` — genera versiones optimizadas en WebP a
  partir de los originales (ejecución manual, ver abajo).
- `app/` — la aplicación (Vite + React + TypeScript + Tailwind + Framer
  Motion).

## Desarrollo

```bash
cd app
npm install
npm run dev
```

## Scripts (dentro de `app/`)

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción (type-check + Vite build)
- `npm run test` — pruebas (Vitest)
- `npm run lint` — lint (oxlint)
- `npm run format` — formatea con Prettier

## Regenerar imágenes optimizadas

```bash
node scripts/optimize-images.mjs
```
