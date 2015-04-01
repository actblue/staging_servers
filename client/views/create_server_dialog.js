/*global Template, Session, AutoForm */

Template.createServerDialog.events({
  'click .create-sever-dialog .cancel, click .create-sever-dialog.mask': function () {
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
