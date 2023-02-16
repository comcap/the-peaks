import { lazy } from 'react'

const HomePage = lazy(() => import('./HomePage'))
const ArticlePage = lazy(() => import('./ArticlePage'))

export { HomePage, ArticlePage }
