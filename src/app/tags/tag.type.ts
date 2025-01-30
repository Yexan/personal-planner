export type Tag = {
  id: string
  name: string
  color?: string
}

export type TagWithoutId = Omit<Tag, 'id'>

export type TagStat = {
  tagName: string
  amount: number
  color: string
}
