Servers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    unique: true,
    max: 100
  },
  url: {
    type: String,
    label: 'URL',
    unique: true,
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
  insert(userId) {
    // You can only add servers if you are logged in.
    return !!userId;
  },

  update(userId) {
    // You can only edit servers if you are logged in.
    return !!userId;
  },

  remove(userId) {
    // You can only remove servers if you are logged in.
    return !!userId;
  }
});


Meteor.methods({
  takeIt(serverId) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'You must be logged in');
    }

    Servers.update(serverId, {
      $set: {
        isInUse: true,
        inUseBy: this.userId,
        inUseSince: new Date()
      }
    });
  },

  releaseIt(serverId) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'You must be logged in');
    }

    Servers.update(serverId, {
      $set: {
        isInUse: false,
        description: null,
        inUseBy: null,
        inUseSince: null
      }
    });
  },

  updateDescription(serverId, newDescription) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'You must be logged in');
    }

    Servers.update(serverId, {
      $set: {
        description: newDescription
      }
    });
  }
});
