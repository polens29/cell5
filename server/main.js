import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { PeopleCollection } from '/imports/api/people';

function insertPeople({ firstName, lastName }) {
  PeopleCollection.insert({firstName, lastName, createdAt: new Date()});
}

Meteor.startup(() => {
  //PeopleCollection.remove({});
});
