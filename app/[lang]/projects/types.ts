export type TProjType = 'web' | 'app'

export interface IProject {
  title: string
  desc: string
  projType: TProjType
  titleImg?: string
  using: string[]
  usingPubIdx?: number[]
  whiteImg?: boolean
  to?: string
}