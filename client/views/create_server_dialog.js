/*global Meteor, Template, Session */

Template.createServerDialog.error = function () {
  return Session.get('createServerError');
};

Template.createServerDialog.events({
  'click .save': function (event, template) {
    var name = template.find('.name').value;
    var url = template.find('.url').value;

    if (name.length && url.length) {
      Meteor.call('createServer', {
        name: name,
        url: url
      });
      Session.set("showCreateServerDialog", false);
    } else {
      Session.set('createServerError',
                  'Name and URL are required');
    }
  },

  'click .cancel': function () {
    Session.set('showCreateServerDialog', false);
  }
});
