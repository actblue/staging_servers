/*global Meteor, Template, Session */

Template.createServerDialog.events({
  'click .cancel': function () {
    Session.set('showCreateServerDialog', false);
  }
});

AutoForm.debug();
