Template.createServerDialog.events({
  'click .create-sever-dialog .cancel, click .create-sever-dialog.mask'() {
    closeCreateServerDialog();
  },

  'keydown [type=text]'(event) {
    // ESC
    if (event.which == 27) {
      event.preventDefault();
      closeCreateServerDialog();
    }
  }
});

AutoForm.hooks({
  insertServerForm: {
    after: {
      insert(error) {
        if (!error) {
          closeCreateServerDialog();
        }
      }
    }
  }
});

closeCreateServerDialog = (id) => {
  Session.set('showCreateServerDialog', false);
};
