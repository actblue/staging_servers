/*global Template, Session */

Template.page.helpers({
  showCreateServerDialog: function() {
    return Session.get('showCreateServerDialog');
  },

  showEditServerDialog: function() {
    return !!Session.get('editingServerId');
  }
});
