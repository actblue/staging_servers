/*global Template, Session */

Template.page.showCreateServerDialog = function () {
  var showCreateServerDialog = Session.get("showCreateServerDialog");
  return showCreateServerDialog;
};
