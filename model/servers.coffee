Servers.attachSchema new SimpleSchema(
  name:
    type: String
    label: 'Name'
    unique: true
    max: 100
  url:
    type: String
    label: 'URL'
    unique: true
    max: 200
  notes:
    type: String
    label: 'Notes'
    optional: true
  isInUse:
    type: Boolean
    autoValue: ->
      if @isInsert
        false
      else if @isUpsert
        { $setOnInsert: false }
  inUseBy:
    type: String
    optional: true
  inUseSince:
    type: Date
    optional: true
  description:
    type: String
    optional: true
)


Servers.allow

  insert: (userId) ->
    # You can only add servers if you are logged in.
    !!userId

  update: (userId) ->
    # You can only edit servers if you are logged in.
    !!userId

  remove: (userId) ->
    # You can only remove servers if you are logged in.
    !!userId


Meteor.methods

  takeIt: (serverId) ->
    unless @userId
      throw new Meteor.Error 403, 'You must be logged in'
    Servers.update serverId, $set:
      isInUse: true
      inUseBy: @userId
      inUseSince: new Date()

  releaseIt: (serverId) ->
    unless @userId
      throw new Meteor.Error 403, 'You must be logged in'
    Servers.update serverId, $set:
      isInUse: false
      description: null
      inUseBy: null
      inUseSince: null

  updateDescription: (serverId, newDescription) ->
    unless @userId
      throw new Meteor.Error 403, 'You must be logged in'
    Servers.update serverId, $set:
      description: newDescription
