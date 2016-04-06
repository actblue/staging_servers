Template.server.helpers({
  fullUrl() {
    if (!this.url) return null;
    if (this.url.match(/^http/)) {
      return this.url;
    } else {
      return 'http://' + this.url;
    }
  },

  isInUseClass() {
    if (this.isInUse) {
      return 'in-use';
    } else {
      return 'not-in-use';
    }
  },

  inUseByUserImage() {
    const user = Meteor.users.findOne(this.inUseBy);
    return Gravatar.imageUrl(Gravatar.hash(user.emails[0].address));
  },

  inUseByName() {
    const user = Meteor.users.findOne(this.inUseBy);
    if (!user) {
      return 'no one';
    } else if (user.profile && user.profile.name) {
      return user.profile.name;
    } else {
      return user.emails[0].address;
    }
  },

  niceDate(date) {
    return date.toLocaleString();
  },

  hasNotes() {
    return !!this.notes;
  },

  beforeDeleteServer() {
    return function(collection, id) {
      const server = collection.findOne(id);
      if (confirm(`Are you sure you want to delete server ${server.name}?`)) {
        return this.remove();
      }
    };
  }
});


Template.server.events({
  'keydown [type=text]'(event) {
    // ESC or ENTER
    if (event.which == 27 || event.which == 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  // Update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates
  // (handles the event at most once every 300ms)
  'keyup input[type=text]': _.throttle((function(event) {
    Meteor.call('updateDescription', this._id, event.target.value);
  }), 300),

  'click .take'() {
    Meteor.call('takeIt', this._id);
  },

  'click .release'() {
    Meteor.call('releaseIt', this._id);
  },

  'click .server h2.name span.edit'() {
    // must be logged in to create servers
    if (!Meteor.userId()) { return; }

    openEditServerDialog(this._id);
  }
});

openEditServerDialog = (id) => {
  Session.set('editingServerId', id);
};
