import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Loader } from 'components/output'
import * as Pages from 'pages'

import './App.scss'

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/' component={Pages.HomePage} />
          {/* <Route exact path='/' component={Pages.DashboardPage} />
          <Route
            path='/system/term-condition'
            component={Pages.DashboardPage}
          /> */}
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
