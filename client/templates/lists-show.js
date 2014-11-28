Template.listsShow.created = function() {
  // subscribe to todos before the page is rendered but don't wait on the
  // subscription, we'll just render the items as they arrive
  this.todosHandle = Meteor.subscribe('todos', this.data._id);
};

Template.listsShow.helpers({
  todosReady: function() {
    return Template.instance().todosHandle.ready();
  },

  nameClass: function() {
    var date = moment(this.date);
    if(date.isSame(moment().startOf('day'))) {
      return 'today';
    }
    else {
      return 'tomorrow';
    }
  },

  name: function(klass) {
    switch(klass) {
      case 'today': return 'Today';
      case 'tomorrow': return 'Tomorrow';
    }
  },

  todos: function(list) {
    return Todos.find({ listId: list._id }, { sort: { createdAt : 1 } });
  }
});

Template.listsShow.events({
  // update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once
  // every 300ms)
  'keyup input[type=text]': _.throttle(function(event) {
    Lists.update(this._id, { $set: { text: event.target.value } });
  }, 300),

  'keydown input[type=text]': function(event) {
    // ESC
    if (27 === event.which) {
      event.preventDefault();
      $(event.target).blur();
    }
  },

  'click .js-todo-add': function(event, template) {
    template.$('.js-todo-new input').focus();
  },

  'submit .js-todo-new': function(event) {
    event.preventDefault();

    var $input = $(event.target).find('[type=text]');
    if (! $input.val())
      return;

    Todos.insert({
      listId: this._id,
      text: $input.val(),
      checked: false,
      createdAt: new Date()
    });
    $input.val('');
  },

  'keyup textarea': _.throttle(function(event) {
    Lists.update(this._id, { $set: { journal: event.target.value } });
  }, 300)
});
