import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import { useSelector, useDispatch } from 'react-redux';

import { taskStatusSelector, readTasksThunk } from './Tasks/tasksSlice';
import { tagsStatusSelector, readTagsThunk } from './Tags/tagsSlice';

import Tasks from './Tasks';
import ByTags from './Tags/ByTags';

export default function App() {
  const dispatch = useDispatch();
  const taskStatus = useSelector(taskStatusSelector);
  const tagStatus = useSelector(tagsStatusSelector);

  React.useEffect(() => { // tasks
    if (taskStatus === 'idle') dispatch(readTasksThunk());
  }, [taskStatus, dispatch]);

  React.useEffect(() => { // tags
    if (tagStatus === 'idle') dispatch(readTagsThunk());
  }, [tagStatus, dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/tags/:id"><ByTags /></Route>
        <Route exact path="/"><Tasks /></Route>
      </Switch>
    </Router>
  );
}