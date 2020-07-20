import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./components/Home/Home'));
const Room = lazy(() => import('./components/Chat/Room'));

const App = () => (
  <Router>
    <Suspense fallback={<center><h1>Loading...</h1></center>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/room/:roomID" component={Room}/>
        <Route component={<center><h1>404 Not Found</h1></center>} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
