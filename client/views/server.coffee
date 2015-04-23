Template.server.helpers

  fullUrl: ->
    if @url
      if @url.match /^http/
        @url
      else
        'http://' + @url

  isInUseClass: ->
    if @isInUse then 'in-use' else 'not-in-use'

  inUseByUserImage: ->
    user = Meteor.users.findOne @inUseBy
    Gravatar.imageUrl Gravatar.hash user.emails[0].address

  inUseByName: ->
    user = Meteor.users.findOne @inUseBy
    unless user
      'no one'
    else if user.profile and user.profile.name
      user.profile.name
    else
      user.emails[0].address

  niceDate: (date) ->
    date.toLocaleString()

  hasNotes: ->
    !!@notes

  beforeDeleteServer: ->
    (collection, id) ->
      server = collection.findOne id
      if confirm('Are you sure you want to delete server ' + server.name + '?')
        @remove()


Template.server.events

  'keydown [type=text]': (event) ->
    # ESC or ENTER
    if event.which == 27 or event.which == 13
      event.preventDefault()
      event.target.blur()

  # Update the text of the item on keypress but throttle the event to ensure
  # we don't flood the server with updates
  # (handles the event at most once every 300ms)
  'keyup input[type=text]': _.throttle(((event) ->
    Meteor.call 'updateDescription', @_id, event.target.value
  ), 300)

  'click .take': ->
    Meteor.call 'takeIt', @_id

  'click .release': ->
    Meteor.call 'releaseIt', @_id

  'click .server h2.name span.edit': ->
    unless Meteor.userId()
      # must be logged in to create servers
      return
    openEditServerDialog @_id



openEditServerDialog = (id) ->
  Session.set 'editingServerId', id
