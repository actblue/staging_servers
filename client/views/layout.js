Template.layout.onCreated(function () {
  this.autorun(() => {
    this.subscribe('servers');
    this.subscribe('usersDirectory');
    this.subscribe('userProfile', Meteor.userId());
  });
});


Template.layout.helpers({
  appReady() {
    return Template.instance().subscriptionsReady();
  }
});
