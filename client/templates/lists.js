// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;

Template.lists.rendered = function() {
  if (firstRender) {
    // Released in app-body.js
    listFadeInHold = LaunchScreen.hold();

    // Handle for launch screen defined in app-body.js
    listRenderHold.release();

    firstRender = false;
  }
};

var findOrCreateList = function(listDate) {
  var list = Lists.findOne({
    date: listDate
  });

  if(!list) {
    listId = Lists.insert({
      userId: Meteor.userId(),
      createdAt: new Date(),
      date: listDate
    });

    list = Lists.findOne({ _id: listId });
  }

  return list;
}

Template.lists.helpers({
  lists: function() {
    // find or create list based on date
    var today = moment().startOf('day');
    var listToday = findOrCreateList(today.toDate());

    var yesterday = today.clone().subtract(1, 'days');
    var listYesterday = findOrCreateList(yesterday.toDate());

    var tomorrow = today.clone().add(1, 'days');
    var listTomorrow = findOrCreateList(tomorrow.toDate());

    return [listYesterday, listToday, listTomorrow];
  }
})
