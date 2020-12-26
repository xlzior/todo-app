import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Tasks from './App';
import TagsList from './Tags/TagsList';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tags"><TagsList /></Route>
        <Route exact path="/"><Tasks /></Route>
      </Switch>
    </Router>
  );
}