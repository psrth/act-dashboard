import { Switch, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './screens/Home'
import Login from './screens/Login'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
