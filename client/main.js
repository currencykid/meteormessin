import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Todos = new Mongo.Collection('todos'); 

if (Meteor.isClient){
  // template helpers
  
  Template.main.helpers({
    todos: function(){
      return Todos.find();
    }
  });
}
