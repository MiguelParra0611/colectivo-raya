import { describe, expect, it } from 'vitest'
import { artists, getArtistBySlug } from '../data/artists'

describe('artists data', () => {
  it('has exactly the two expected artists', () => {
    expect(artists.map((a) => a.slug).sort()).toEqual(['brenda', 'jose'])
  })

  it('gives every artist a non-empty project list', () => {
    for (const artist of artists) {
      expect(artist.projects.length).toBeGreaterThan(0)
    }
  })

  it('gives every artist a unique id and slug', () => {
    const ids = artists.map((a) => a.id)
    const slugs = artists.map((a) => a.slug)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('gives every project a unique id within its artist and a resolved image', () => {
    for (const artist of artists) {
      const projectIds = artist.projects.map((p) => p.id)
      expect(new Set(projectIds).size).toBe(projectIds.length)

      for (const project of artist.projects) {
        expect(project.image.thumbSrc).toBeTruthy()
        expect(project.image.fullSrc).toBeTruthy()
        expect(typeof project.image.thumbSrc).toBe('string')
        expect(typeof project.image.fullSrc).toBe('string')
      }
    }
  })

  it('defaults every artist to no decorative frame', () => {
    for (const artist of artists) {
      expect(artist.frameStyle).toBe('none')
    }
  })

  it('finds an artist by slug', () => {
    expect(getArtistBySlug('jose')?.name).toBe('José Gutierrez')
    expect(getArtistBySlug('brenda')?.name).toBe('Brenda Villanueva')
    expect(getArtistBySlug('nope')).toBeUndefined()
  })
})
