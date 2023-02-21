export type IArticle = {
  title: string
  thumbnail?: string
  body?: string
  className?: string
  flex?: string
  span?: string
  height?: string
  onClick?: () => void
  isOnlyTitle?: boolean
  section: string
}

export type IResponse = {
  currentPage: number
  orderBy: string
  pageSize: number
  pages: number
  results: IResArticles[]
  startIndex: number
  status: string
  total: number
  userTier: string
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
    standfirst: string
  }
}

export type ColorSection = {
  news: string
  sport: string
  culture: string
  lifeandstyle: string
}

export type ArticleStyleType = {
  flex?: string
  span?: string
  height?: string
  colorSection: string
}
