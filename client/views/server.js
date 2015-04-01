/*global Template, Meteor, Session, confirm, _ */

Template.server.helpers({
  fullUrl: function() {
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
  },

  niceDate: function(date) {
    return date.toLocaleString();
  },

  beforeDeleteServer: function() {
    return function(collection, id) {
      var server = collection.findOne(id);
      if (confirm('Are you sure you want to delete server ' + server.name + '?')) {
        this.remove();
      }
    };
  }
});

Template.server.events({
  'keydown [type=text]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  // Update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates
  // (handles the event at most once every 300ms)
  'keyup input[type=text]': _.throttle(function(event) {
    Meteor.call('updateDescription', this._id, event.target.value);
  }, 300),

  'click .take': function() {
    Meteor.call('takeIt', this._id);
  },

  'click .release': function() {
    Meteor.call('releaseIt', this._id);
  },

  'click .server h2.name span.edit': function() {
    if (! Meteor.userId()) {
      // must be logged in to create servers
      return;
    }
    openEditServerDialog(this._id);
  }
});

var openEditServerDialog = function(id) {
  Session.set('editingServerId', id);
};
