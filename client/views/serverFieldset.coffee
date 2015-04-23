Template.serverFieldset.helpers

  hasDefaultUrlPattern: ->
    Meteor.settings?.public?.urlPattern?

  defaultUrl: ->
    if Meteor.settings?.public?.urlPattern?
      urlPattern = Meteor.settings.public.urlPattern
      name = AutoForm.getFieldValue 'name'
      urlPattern.replace '%', if name then name else '%'
    else
      ''
