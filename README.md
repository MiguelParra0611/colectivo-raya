# Colectivo Raya

Galería virtual de arte — pieza de portafolio frontend-only. Cada
ilustrador tiene su portafolio con proyectos individuales, marcos
decorativos opcionales y zoom de imágenes; además hay una tienda donde
se "venden" licencias de uso de las ilustraciones (con carrito, checkout
y favoritos simulados), una sección de donaciones para apoyar a los
artistas, y una demo de creación de portafolio con flujo de revisión.

No hay backend ni base de datos: todos los datos (artistas, proyectos,
productos, imágenes) viven hardcodeados en el código como un sitio 100%
estático. Ningún pago, envío de correo o revisión es real — todo el
comercio/checkout/revisión de portafolios es una simulación de UX.

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

## Correcciones y roadmap

Registro de las correcciones y peticiones pedidas sobre la marcha —
además de quedar en los commits de git, se listan aquí para tener
trazabilidad rápida de qué se pidió y cómo quedó.

### 2026-08-11

**Marcos decorativos y detalles del lightbox**

- [x] Los marcos decorativos se notaban muy poco (adornos pequeños,
      apenas visibles) — se agrandaron y reposicionaron para que se lean
      como un marco alrededor de la tarjeta.
- [x] El zoom con rueda del lightbox generaba un error en consola
      (listener "passive") — corregido con un listener nativo.
- [x] El hover-zoom de las miniaturas de proyecto no se activaba —
      faltaba la clase `group` en el contenedor.

**Logo, paleta, header, tienda/checkout/donaciones/favoritos**

- [x] Logo real extraído del PDF de marca (ícono, horizontal, vertical)
      como SVG vectorial — favicon actualizado al ícono.
- [x] Favicon en negro por defecto, con variante naranja para modo
      oscuro donde el navegador lo soporte (Chrome/Edge sí, Firefox/
      Safari se quedan con el negro).
- [x] Paleta de marca aplicada (`#FF9F1C`, `#FFBF69`, blanco dominante,
      `#CBF3F0`, `#2EC4B6`); el sitio pasó de tema oscuro a
      glassmorphism claro.
- [x] Header rediseñado: logo horizontal, animado al cargar, efecto
      "shine" (reflejo de cristal) en los elementos interactivos.
- [x] Nueva sección de tienda (`/tienda`), detalle de producto, carrito
      (`/carrito`), checkout simulado multi-paso (`/checkout`),
      favoritos (`/favoritos`) y donaciones (`/apoyar`).
- [x] Bug: el badge de favoritos/carrito en el header se veía cortado
      — el propio efecto "shine" recortaba el badge con `overflow:hidden`.
- [x] Bug: arrastre con clic izquierdo lento en el lightbox al hacer
      zoom — el navegador interceptaba el drag nativo de la imagen.
- [x] Bug: franjas grises en el visor de proyectos ampliado — cambiadas
      a fondo blanco sólido.
- [x] Bug: ícono de corazón (favorito) recortado en las tarjetas de la
      tienda — mismo problema del efecto "shine" recortando contenido.
- [x] Checkout: el número de tarjeta y la fecha de vencimiento se
      formatean automáticamente mientras se escriben (grupos de 4 /
      `MM/AA`).
- [x] Animación de burbujas subiendo desde abajo al completar una
      compra o una donación (algunas revientan a mitad de camino, otras
      cerca de arriba, otras se pierden subiendo).
- [x] "Apoyar": el destinatario "Colectivo Raya (ambos artistas)" pasó a
      "Todos los artistas" (refleja que el roster de artistas puede
      crecer, no está fijo en dos).
- [x] Flujo de creación de portafolio: ahora tiene un botón final
      "Crear portafolio" (con validación) que abre un disclaimer de
      revisión, simula el proceso, y termina con una respuesta de
      aceptación de Colectivo Raya.
- [x] Repositorio publicado en GitHub como público:
      [github.com/MiguelParra0611/colectivo-raya](https://github.com/MiguelParra0611/colectivo-raya).
      Los commits desde este punto usan el correo privado de GitHub
      (`@users.noreply.github.com`); los commits anteriores a esta fecha
      conservan el correo real en el historial (no se reescribió).
