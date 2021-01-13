import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './routes/home'
import { Transactions } from './routes/transactions'
import { Analytics } from './routes/analytics'
import { Settings } from './routes/settings'
import Sidebar from './components/sidebar'

export default function AppRouter () {
  return (
    <Router>
      <Sidebar />
      <div css={contentStyle}>
        <Route component={Home} exact path='/' />
        <Route component={Transactions} exact path='/transactions' />
        <Route component={Analytics} exact path='/analytics' />
        <Route component={Settings} exact path='/settings' />
      </div>
    </Router>
  )
}

/* ---------- Styles ----------- */

const contentStyle = css`
  margin: 17px;
  margin-left: 265px;
`
