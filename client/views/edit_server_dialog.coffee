Template.editServerDialog.helpers

  editingServer: ->
    Servers.findOne Session.get('editingServerId')


Template.editServerDialog.events

  'click .edit-sever-dialog .cancel, click .edit-sever-dialog.mask': ->
    Session.set 'editingServerId', null


AutoForm.hooks

  editServerForm:
    after:
      update: (error) ->
        unless error
          Session.set 'editingServerId', null
