import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Tasks from './Tasks';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/"><Tasks /></Route>
      </Switch>
    </Router>
  )
}