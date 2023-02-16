import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import moment from 'moment-timezone'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Loader } from 'components/output'
import { HomePage, ArticlePage } from 'pages'

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
            {/* <Route
            path='/system/term-condition'
            component={Pages.DashboardPage}
          /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

export default App
