/*global Meteor, Template, Session, Servers */

Template.serversList.servers = function() {
  return Servers.find({}, {sort: {name: 1}});
};

Template.serversList.events({
  'click .new_server': function() {
    if (! Meteor.userId()) {
      // must be logged in to create servers
      return;
    }
    openCreateServerDialog();
  }
});

var openCreateServerDialog = function () {
  Session.set('createServerError', null);
  Session.set('showCreateServerDialog', true);
};
