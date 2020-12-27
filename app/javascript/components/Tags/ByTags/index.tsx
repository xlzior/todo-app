import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Page from '../../Page';
import { tagSelector } from '../tagsSlice';
import './index.css';

export default function ByTags() {
  const { id } = useParams();
  const tagData = useSelector(tagSelector(id));
  return (
    <Page title={tagData?.attributes.name}>
      <p>Hi</p>
    </Page>
  );
}