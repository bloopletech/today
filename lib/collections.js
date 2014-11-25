Lists = new Meteor.Collection('lists');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'List ' + nextLetter;
  }

  return nextName;
};

Lists.allow({
  insert: function(userId, list) {
    return list.userId === userId;
  },
  update: function(userId, list, fieldNames, modifier) {
    return list.userId === userId;
  },
  remove: function(userId, list) {
    return list.userId === userId;
  }
});

Todos = new Meteor.Collection('todos');

Todos.allow({
  insert: function(userId, todo) {
    var list = Lists.findOne(todo.listId);
    return list.userId === userId;
  },
  update: function(userId, todo, fieldNames, modifier) {
    var list = Lists.findOne(todo.listId);
    return list.userId === userId;
  },
  remove: function(userId, todo) {
    var list = Lists.findOne(todo.listId);
    return list.userId === userId;
  }
});