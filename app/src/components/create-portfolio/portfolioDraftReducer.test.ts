import { describe, expect, it } from 'vitest'
import {
  createInitialDraft,
  portfolioDraftReducer,
} from './portfolioDraftReducer'

describe('portfolioDraftReducer', () => {
  it('starts with an empty description, no frame, and one empty project', () => {
    const draft = createInitialDraft()
    expect(draft.portfolioDescription).toBe('')
    expect(draft.frameStyle).toBe('none')
    expect(draft.projects).toHaveLength(1)
  })

  it('updates the portfolio description', () => {
    const draft = createInitialDraft()
    const next = portfolioDraftReducer(draft, {
      type: 'SET_DESCRIPTION',
      description: 'Un portafolio de prueba',
    })
    expect(next.portfolioDescription).toBe('Un portafolio de prueba')
  })

  it('updates the selected frame style', () => {
    const draft = createInitialDraft()
    const next = portfolioDraftReducer(draft, {
      type: 'SET_FRAME',
      frameStyle: 'butterflies',
    })
    expect(next.frameStyle).toBe('butterflies')
  })

  it('adds a new empty project with a unique id', () => {
    const draft = createInitialDraft()
    const next = portfolioDraftReducer(draft, { type: 'ADD_PROJECT' })
    expect(next.projects).toHaveLength(2)
    expect(next.projects[0].id).not.toBe(next.projects[1].id)
  })

  it('removes a project by id', () => {
    const draft = createInitialDraft()
    const withSecond = portfolioDraftReducer(draft, { type: 'ADD_PROJECT' })
    const idToRemove = withSecond.projects[0].id

    const next = portfolioDraftReducer(withSecond, {
      type: 'REMOVE_PROJECT',
      id: idToRemove,
    })

    expect(next.projects).toHaveLength(1)
    expect(next.projects.some((p) => p.id === idToRemove)).toBe(false)
  })

  it('updates only the targeted project title, leaving others untouched', () => {
    const draft = createInitialDraft()
    const withSecond = portfolioDraftReducer(draft, { type: 'ADD_PROJECT' })
    const [first, second] = withSecond.projects

    const next = portfolioDraftReducer(withSecond, {
      type: 'SET_PROJECT_TITLE',
      id: first.id,
      title: 'Nuevo título',
    })

    expect(next.projects.find((p) => p.id === first.id)?.title).toBe(
      'Nuevo título',
    )
    expect(next.projects.find((p) => p.id === second.id)?.title).toBe('')
  })

  it('updates the project description', () => {
    const draft = createInitialDraft()
    const [first] = draft.projects
    const next = portfolioDraftReducer(draft, {
      type: 'SET_PROJECT_DESCRIPTION',
      id: first.id,
      description: 'Una descripción de proyecto',
    })
    expect(next.projects[0].description).toBe('Una descripción de proyecto')
  })

  it('sets the project preview image url', () => {
    const draft = createInitialDraft()
    const [first] = draft.projects
    const next = portfolioDraftReducer(draft, {
      type: 'SET_PROJECT_IMAGE',
      id: first.id,
      previewUrl: 'blob:mock/x',
    })
    expect(next.projects[0].previewUrl).toBe('blob:mock/x')
  })
})
