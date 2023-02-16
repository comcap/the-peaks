export type IArticle = {
  title: string
  thumbnail?: string
  body?: string
  className?: string
  onClick?: () => void
}

export type IResArticles = {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: Date
  webTitle: string
  webUrl: string
  apiUrl: string
  isHosted: boolean
  pillarId: string
  pillarName: string
  fields?: {
    thumbnail: string
    bodyText: string
    headline: string
    body: string
    main: string
  }
}
