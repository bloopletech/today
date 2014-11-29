var nameClassHelper = function() {
  var dateable = Template.currentData();
  if(!dateable.date) dateable = Template.parentData(1);

  var date = moment(dateable.date);
  var today = moment().startOf('day');
  if(date.isSame(today.clone().subtract(1, 'days'))) {
    return 'yesterday';
  }
  else if(date.isSame(today)) {
    return 'today';
  }
  else if(date.isSame(today.clone().add(1, 'days'))) {
    return 'tomorrow';
  }
};

Template.registerHelper("nameClass", function() {
  return nameClassHelper();
});
Template.registerHelper("name", function() {
  switch(nameClassHelper()) {
    case 'yesterday': return 'Yesterday';
    case 'today': return 'Today';
    case 'tomorrow': return 'Tomorrow';
  }
});
Template.registerHelper("fieldReadonly", function() {
  if(nameClassHelper() == 'yesterday') return 'readonly';
  else return '';
});
Template.registerHelper("fieldDisabled", function() {
  if(nameClassHelper() == 'yesterday') return 'disabled';
  else return '';
});