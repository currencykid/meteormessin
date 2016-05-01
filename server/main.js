import { Meteor } from 'meteor/meteor';

Todos = new Mongo.Collection('todos'); 
Meteor.startup(() => {
  // code to run on server at startup
});
