import type { FrameStyle } from '../../data/types'

export interface DraftProject {
  id: string
  title: string
  description: string
  previewUrl: string | null
}

export interface PortfolioDraft {
  portfolioDescription: string
  frameStyle: FrameStyle
  projects: DraftProject[]
}

export type PortfolioDraftAction =
  | { type: 'SET_DESCRIPTION'; description: string }
  | { type: 'SET_FRAME'; frameStyle: FrameStyle }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT'; id: string }
  | { type: 'SET_PROJECT_TITLE'; id: string; title: string }
  | { type: 'SET_PROJECT_DESCRIPTION'; id: string; description: string }
  | { type: 'SET_PROJECT_IMAGE'; id: string; previewUrl: string }

let nextDraftId = 0
export function createDraftProjectId(): string {
  nextDraftId += 1
  return `draft-${nextDraftId}`
}

export function createEmptyDraftProject(): DraftProject {
  return {
    id: createDraftProjectId(),
    title: '',
    description: '',
    previewUrl: null,
  }
}

export function createInitialDraft(): PortfolioDraft {
  return {
    portfolioDescription: '',
    frameStyle: 'none',
    projects: [createEmptyDraftProject()],
  }
}

export function portfolioDraftReducer(
  draft: PortfolioDraft,
  action: PortfolioDraftAction,
): PortfolioDraft {
  switch (action.type) {
    case 'SET_DESCRIPTION':
      return { ...draft, portfolioDescription: action.description }
    case 'SET_FRAME':
      return { ...draft, frameStyle: action.frameStyle }
    case 'ADD_PROJECT':
      return {
        ...draft,
        projects: [...draft.projects, createEmptyDraftProject()],
      }
    case 'REMOVE_PROJECT':
      return {
        ...draft,
        projects: draft.projects.filter((project) => project.id !== action.id),
      }
    case 'SET_PROJECT_TITLE':
      return {
        ...draft,
        projects: draft.projects.map((project) =>
          project.id === action.id
            ? { ...project, title: action.title }
            : project,
        ),
      }
    case 'SET_PROJECT_DESCRIPTION':
      return {
        ...draft,
        projects: draft.projects.map((project) =>
          project.id === action.id
            ? { ...project, description: action.description }
            : project,
        ),
      }
    case 'SET_PROJECT_IMAGE':
      return {
        ...draft,
        projects: draft.projects.map((project) =>
          project.id === action.id
            ? { ...project, previewUrl: action.previewUrl }
            : project,
        ),
      }
    default:
      return draft
  }
}
