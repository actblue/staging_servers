/*global Template, Servers, Session, AutoForm */

Template.editServerDialog.helpers({
  editingServer: function() {
    return Servers.findOne( Session.get('editingServerId') );
  }
});

Template.editServerDialog.events({
  'click .edit-sever-dialog .cancel, click .edit-sever-dialog.mask': function () {
    Session.set('editingServerId', null);
  }
});

AutoForm.hooks({
  editServerForm: {
    after: {
      update: function(error) {
        if (!error) {
          Session.set('editingServerId', null);
        }
      }
    }
  }
});
