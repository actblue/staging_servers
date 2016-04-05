Template.createServerDialog.events({

  'click .create-sever-dialog .cancel, click .create-sever-dialog.mask'() {
    return Session.set('showCreateServerDialog', false);
  }

});


AutoForm.hooks({

  insertServerForm: {
    after: {
      insert(error) {
        if (!error) {
          return Session.set('showCreateServerDialog', false);
        }
      }
    }
  }

});
