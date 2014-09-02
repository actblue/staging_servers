/*global Meteor, check, Match */

Servers = new Meteor.Collection("servers");

Servers.allow({
  insert: function() {
    return false;   // Use createServer method for inserts
  },

  update: function() {
    return false;
  },

  remove: function(userId, server) {
    // You can only remove servers if you are logged in
    return !!userId;
  }
});

Meteor.methods({
  // options should include: name, url
  createServer: function(options) {
    console.log('createServer');

    if (! this.userId)
      throw new Meteor.Error(403, 'You must be logged in');

    check(options, {
      name: NonEmptyString,
      url: NonEmptyString
    });

    var id = Servers.insert({
      name: options.name,
      url: options.url,
      isInUse: false
    });
    return id;
  },

  takeIt: function(serverId) {
    if (! this.userId)
      throw new Meteor.Error(403, 'You must be logged in');

    Servers.update(serverId, {$set: {isInUse: true}})
  },

  releaseIt: function(serverId) {
    if (! this.userId)
      throw new Meteor.Error(403, 'You must be logged in');

    Servers.update(serverId, {$set: {isInUse: false}})
  }
});


var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length !== 0;
});
