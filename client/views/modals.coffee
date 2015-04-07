Template.modals.helpers

  showCreateServerDialog: ->
    Session.get 'showCreateServerDialog'

  showEditServerDialog: ->
    !!Session.get 'editingServerId'
