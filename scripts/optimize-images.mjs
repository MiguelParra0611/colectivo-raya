// Genera versiones optimizadas (WebP) de las ilustraciones originales.
// Uso: node scripts/optimize-images.mjs   (desde la raíz del repo)
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const THUMB_WIDTH = 480
const FULL_MAX_EDGE = 1800

// slug de salida por artista/archivo -> nombre de archivo web-safe.
// Los nombres de proyecto reflejan los títulos usados en la capa de datos
// (src/data/artists.ts) para que las rutas de imagen sean fáciles de mapear.
const ARTISTS = {
  jose: {
    sourceDir: 'ilustraciones-jose',
    files: {
      'Poki.png': 'poki',
      'Orange.png': 'naranja',
      'Tigre.png': 'guardiana-de-piedra',
      'Whitebird.png': 'alas-veladas',
      'crow.png': 'mensajeras',
      'sacred rep 13.png': 'corona-de-astros',
    },
  },
  brenda: {
    sourceDir: 'ilustraciones-brenda',
    files: {
      'elephant.png': 'estudio-de-elefantes',
      'flying bike.png': 'fuga-nocturna',
      'kid.png': 'dia-de-playa',
      'slug.png': 'criatura-de-engranajes',
      'snow.png': 'cuento-de-invierno',
      'Imagen 5 Bitacora.png': 'ave-de-bitacora',
    },
  },
}

async function optimizeArtist(artistSlug, { sourceDir, files }) {
  const inputDir = path.join(repoRoot, sourceDir)
  const outputDir = path.join(repoRoot, 'app/src/assets/images', artistSlug)
  await mkdir(outputDir, { recursive: true })

  const entries = await readdir(inputDir)

  for (const [sourceFile, outSlug] of Object.entries(files)) {
    if (!entries.includes(sourceFile)) {
      console.warn(
        `[optimize-images] aviso: no se encontró "${sourceFile}" en ${sourceDir}, se omite.`,
      )
      continue
    }
    const inputPath = path.join(inputDir, sourceFile)

    const thumbPath = path.join(outputDir, `${outSlug}-thumb.webp`)
    await sharp(inputPath)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(thumbPath)

    const fullPath = path.join(outputDir, `${outSlug}-full.webp`)
    await sharp(inputPath)
      .resize({
        width: FULL_MAX_EDGE,
        height: FULL_MAX_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toFile(fullPath)

    console.log(`[optimize-images] ${artistSlug}/${outSlug}: thumb + full ok`)
  }
}

for (const [artistSlug, config] of Object.entries(ARTISTS)) {
  await optimizeArtist(artistSlug, config)
}

console.log('[optimize-images] listo.')
