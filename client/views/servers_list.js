Template.serversList.helpers({
  servers() {
    return Servers.find({}, { sort: { name: 1 } });
  }
});

Template.serversList.events({
  'click .new_server'() {
    if (!Meteor.userId()) {
      return;
    }
    openCreateServerDialog();
  }
});

const openCreateServerDialog = () => {
  Session.set('showCreateServerDialog', true);
}
