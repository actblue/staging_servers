Template.serversList.helpers

  servers: ->
    Servers.find(
      {}
    ,
      sort:
        name: 1
    )


Template.serversList.events

  'click .new_server': ->
    unless Meteor.userId()
      # must be logged in to create servers
      return
    openCreateServerDialog()



openCreateServerDialog =  ->
  Session.set 'showCreateServerDialog', true
