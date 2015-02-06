/*global Meteor, Template, Session, Servers */

var serversHandle = Meteor.subscribe('servers');

Template.serversList.servers = function() {
  return Servers.find({}, {sort: {name: 1}});
};

Template.serversList.loading = function() {
  return !serversHandle.ready();
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
  Session.set('showCreateServerDialog', true);
};
