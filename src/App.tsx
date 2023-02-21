import moment from 'moment-timezone'
import { ArticlePage, HomePage } from 'pages'
import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Loader } from 'components/output'

import './App.scss'

const queryClient = new QueryClient()

const App: React.FC = () => {
  moment().tz('Europe/London')

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

export default App
