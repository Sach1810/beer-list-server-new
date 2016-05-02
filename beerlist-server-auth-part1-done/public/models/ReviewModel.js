var ReviewModel = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: {
    name: '',
    text: ''
  }
});