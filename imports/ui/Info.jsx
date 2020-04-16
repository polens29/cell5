import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PeopleCollection } from '../api/people';

export const Info = () => {
  const links = useTracker(() => {
    return PeopleCollection.find().fetch();
  });

  console.log(links)

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{links.map(
        link => <li key={link._id}>
          <a href={link.firstName} target="_blank">{link.lastName}</a>
        </li>
      )}</ul>
    </div>
  );
};
