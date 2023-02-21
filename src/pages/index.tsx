import { lazy } from 'react'

const HomePage = lazy(() => import('./HomePage/homePage'))
const ArticlePage = lazy(() => import('./ArticlePage/articlePage'))

export { HomePage, ArticlePage }
