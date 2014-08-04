Meteor.publish("servers", function () {
  return Servers.find({});
});
