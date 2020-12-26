import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Tasks from './App';
import ByTags from './Tags/ByTags';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tags/:id"><ByTags /></Route>
        <Route exact path="/"><Tasks /></Route>
      </Switch>
    </Router>
  );
}