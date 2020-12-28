import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Page from '../../Page';
import TaskList from '../../Tasks/TaskList';
import useDataFiller from '../../Tasks/useDataFiller';
import { tagSelector } from '../tagsSlice';
import './index.css';

export default function ByTags() {
  const { id } = useParams();
  const tagData = useSelector(tagSelector(id));
  const rawTasks = tagData?.relationships.tasks.data;
  const filledTasks = useDataFiller(rawTasks);
  return (
    <Page title={tagData?.attributes.name}>
      <TaskList tasks={filledTasks} />
    </Page>
  );
}