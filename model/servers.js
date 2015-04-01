/*global Servers, Meteor, Mongo, SimpleSchema */

Servers = new Mongo.Collection("servers");

Servers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    max: 100
  },
  url: {
    type: String,
    label: 'URL',
    max: 200
  },
  notes: {
    type: String,
    label: 'Notes',
    optional: true
  },
  isInUse: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return false;
      } else if (this.isUpsert) {
        return { $setOnInsert: false };
      }
    }
  },
  inUseBy: {
    type: String,
    optional: true
  },
  inUseSince: {
    type: Date,
    optional: true
  },
  description: {
    type: String,
    optional: true
  }
}));

Servers.allow({
  insert: function(userId) {
    // You can only add servers if you are logged in.
    return !!userId;
  },

  update: function(userId) {
    // You can only edit servers if you are logged in.
    return !!userId;
  },

  remove: function(userId) {
    // You can only remove servers if you are logged in.
    return !!userId;
  }
});

Meteor.methods({
  takeIt: function(serverId) {
    if (! this.userId)
      throw new Meteor.Error(403, 'You must be logged in');

    Servers.update(serverId, {
      $set: {
        isInUse: true,
        inUseBy: this.userId,
        inUseSince: new Date()
      }
    });
  },

  releaseIt: function(serverId) {
    if (! this.userId)
      throw new Meteor.Error(403, 'You must be logged in');

    Servers.update(serverId, {
      $set: {
        isInUse: false,
        description: null,
        inUseBy: null,
        inUseSince: null
      }
    });
  },

  updateDescription: function(serverId, newDescription) {
    if (! this.userId)
      throw new Meteor.Error(403, 'You must be logged in');

    Servers.update(serverId, {
      $set: {
        description: newDescription
      }
    });
  }
});
