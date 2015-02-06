/*global Template, Session */

Template.page.helpers({
  showCreateServerDialog: function() {
    return Session.get("showCreateServerDialog");
  }
});
