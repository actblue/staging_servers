Template.createServerDialog.events

  'click .create-sever-dialog .cancel, click .create-sever-dialog.mask': ->
    Session.set 'showCreateServerDialog', false


AutoForm.hooks

  insertServerForm:
    after:
      insert: (error) ->
        unless error
          Session.set 'showCreateServerDialog', false
