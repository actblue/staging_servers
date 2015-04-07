serversHandle = Meteor.subscribe 'servers'

Template.serversList.helpers

  servers: ->
    Servers.find(
      {}
    ,
      sort:
        name: 1
    )

  loading: ->
    !serversHandle.ready()


Template.serversList.events

  'click .new_server': ->
    unless Meteor.userId()
      # must be logged in to create servers
      return
    openCreateServerDialog()



openCreateServerDialog =  ->
  Session.set 'showCreateServerDialog', true
