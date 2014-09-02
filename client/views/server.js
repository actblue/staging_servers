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
  }
});

Template.server.events({
  'click .delete': function() {
    if (window.confirm('Are you sure you want to delete this server?')) {
      Servers.remove(this._id);
    }
    return false;
  },

  'click .taking': function() {
    Meteor.call('takeIt', this._id);
  },

  'click .releasing': function() {
    Meteor.call('releaseIt', this._id);
  }
});
