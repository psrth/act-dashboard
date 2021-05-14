import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from './components/Layout'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import AuthContext from './store/auth'

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Switch>

        <Route path="/" exact>
        {isLoggedIn ?  <Dashboard /> : <Login /> }
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>

      </Switch>
    </Layout>
  );
}

export default App;
