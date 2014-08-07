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
    check(options, {
      name: NonEmptyString,
      url: NonEmptyString
    });

    var id = Servers.insert({
      name: options.name,
      url: options.url
    });
    return id;
  }
});


var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length !== 0;
});
