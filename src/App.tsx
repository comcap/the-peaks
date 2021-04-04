import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import moment from 'moment-timezone'

import { Loader } from 'components/output'
import * as Pages from 'pages'

import './App.scss'

const App: React.FC = () => {
  moment().tz('Europe/London')

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/' component={Pages.HomePage} />
          <Route exact path='/article' component={Pages.ArticlePage} />
          {/* <Route
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
