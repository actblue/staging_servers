/*global Template */

Template.server.helpers({
  fullUrl: function () {
    if (this.url) {
      if (this.url.match(/^http/)) {
        return this.url;
      } else {
        return 'http://' + this.url;
      }
    }
  }
});
