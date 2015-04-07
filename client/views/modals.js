/*global Template, Session */

Template.modals.helpers({
  showCreateServerDialog: function() {
    return Session.get('showCreateServerDialog');
  },

  showEditServerDialog: function() {
    return !!Session.get('editingServerId');
  }
});
