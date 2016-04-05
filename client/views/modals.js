Template.modals.helpers({
  showCreateServerDialog() {
    return Session.get('showCreateServerDialog');
  },

  showEditServerDialog() {
    return !!Session.get('editingServerId');
  }
});
