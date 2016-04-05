Template.editServerDialog.helpers({
  editingServer() {
    return Servers.findOne(Session.get('editingServerId'));
  }
});


Template.editServerDialog.events({
  'click .edit-sever-dialog .cancel, click .edit-sever-dialog.mask'() {
    return Session.set('editingServerId', null);
  }
});


AutoForm.hooks({
  editServerForm: {
    after: {
      update(error) {
        if (!error) {
          return Session.set('editingServerId', null);
        }
      }
    }
  }
});
