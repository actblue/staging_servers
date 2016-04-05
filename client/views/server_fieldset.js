Template.serverFieldset.helpers({
  hasDefaultUrlPattern() {
    return Meteor.settings &&
      Meteor.settings.public &&
      Meteor.settings.public.urlPattern;
  },

  defaultUrl() {
    if (Meteor.settings &&
        Meteor.settings.public &&
        Meteor.settings.public.urlPattern) {
      let urlPattern = Meteor.settings.public.urlPattern;
      let name = AutoForm.getFieldValue('name');
      let replacementString = name ? name : '%';
      return urlPattern.replace('%', replacementString);
    } else {
      return '';
    }
  }
});
