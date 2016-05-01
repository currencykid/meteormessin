import { Meteor } from 'meteor/meteor';

Todos = new Mongo.Collection('todos'); 
Meteor.startup(() => {
  // code to run on server at startup
});


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
