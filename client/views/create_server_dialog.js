/*global Template, Session, AutoForm */

Template.createServerDialog.events({
  'click .cancel': function () {
    Session.set('showCreateServerDialog', false);
  }
});

AutoForm.debug();
