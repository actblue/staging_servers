/*global Template, Session, AutoForm */

Template.createServerDialog.events({
  'click .cancel': function () {
    Session.set('showCreateServerDialog', false);
  }
});

AutoForm.hooks({
  insertServerForm: {
    after: {
      insert: function(error) {
        if (!error) {
          Session.set('showCreateServerDialog', false);
        }
      }
    }
  }
});
