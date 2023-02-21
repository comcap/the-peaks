import moment from 'moment-timezone'
import { Suspense, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Loader, SnackBar } from 'components/output'

import { ArticlePage, HomePage } from 'pages/index'

import './App.scss'

const queryClient = new QueryClient()

const App: React.FC = () => {
  moment().tz('Europe/London')
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', handleStatusChange)
    window.addEventListener('offline', handleStatusChange)

    return () => {
      window.removeEventListener('online', handleStatusChange)
      window.removeEventListener('offline', handleStatusChange)
    }
  }, [isOnline])

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
        <SnackBar show={!isOnline} message="You Are Offline" />
      </Router>
    </QueryClientProvider>
  )
}

export default App
