import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Todos = new Mongo.Collection('todos'); 

if (Meteor.isClient){
  // template helpers

  Template.main.helpers({
    todos: function(){
      return Todos.find({}, {sort: {createdAt: -1 }});
    }
  });


  Template.main.events({
    "submit .new-todo": function(event){
      var text = event.target.text.value;

      Meteor.call('addTodo',text) ;

      //clear form
      event.target.text.value = ''; 

      //Prevent submit
      return false; 
    },

    "click .toggle-checked": function(){
      Meteor.call('setChecked', this._id, !this.checked) ; 
    }, 

    "click .delete-todo": function(){
      if(confirm("Delete task?")){
        Meteor.call('deleteTodo', this._id); 
      }
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY" 
  });
}

// Meteor Methods 
Meteor.methods({
  addTodo: function(text){
  if(!Meteor.userId()){
    throw new Meteor.Error('not authorized'); 
  }
  Todos.insert({
    text: text,
    createdAt: new Date(),
    userId: Meteor.userId(),
    username: Meteor.user().username
  });
},

  deleteTodo:function(todoId){
        Todos.remove(todoId); 
  }, 

  setChecked: function(todoId, setChecked){
      Todos.update(todoId,{$set:{checked: setChecked}});
  } 

});
