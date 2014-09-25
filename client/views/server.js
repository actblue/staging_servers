/*global Template, Servers, window */

Template.server.helpers({
  fullUrl: function () {
    if (this.url) {
      if (this.url.match(/^http/)) {
        return this.url;
      } else {
        return 'http://' + this.url;
      }
    }
  },

  isInUseClass: function() {
    return this.isInUse ? 'in-use' : 'not-in-use';
  },

  inUseByName: function() {
    var user = Meteor.users.findOne(this.inUseBy);
    if (!user) {
      return 'no one';
    } else if (user.profile && user.profile.name) {
      return user.profile.name;
    } else {
      return user.emails[0].address;
    }
  }
});

Template.server.events({
  'click .delete': function() {
    if (window.confirm('Are you sure you want to delete this server?')) {
      Servers.remove(this._id);
    }
    return false;
  },

  'click .take': function() {
    Meteor.call('takeIt', this._id);
  },

  'click .release': function() {
    Meteor.call('releaseIt', this._id);
  }
});
