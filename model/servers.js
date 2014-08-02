/*global Meteor */

Servers = new Meteor.Collection("servers");

Servers.allow({

  insert: function() {
    return false;   // Use createServer method for inserts
  }

});

Meteor.methods({
  // createServer: function(options) {
  //   name:
  //   url:
  // }
});
