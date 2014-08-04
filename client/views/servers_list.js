/*global Meteor, Template, Session */

Meteor.subscribe('servers');

Template.serversList.events({
  'click .new_server': function() {
    if (! Meteor.userId()) {
      // must be logged in to create events
      return;
    }
    openCreateServerDialog();
  }
});

var openCreateServerDialog = function () {
  Session.set('createServerError', null);
  Session.set('showCreateServerDialog', true);
};
