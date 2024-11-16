import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { CurrentStore } from '../api/store';
import { HistoryStore } from '../api/store'

export const Info = () => {
  const isLoading = useSubscribe('history');
  const links = useFind(() => LinksCollection.find());

  if(isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{links.map(
        link => <li key={link._id}>
          <a href={link.url} target="_blank">{link.title}</a>
        </li>
      )}</ul>
    </div>
  );
};
