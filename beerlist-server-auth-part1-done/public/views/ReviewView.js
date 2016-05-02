var ReviewView = Backbone.View.extend({
  className: 'review',

  template: Handlebars.compile($('#review-template').html()),

  events: {
    'click .remove': 'removeReview',
  },

  initialize: function () {
    this.listenTo(this.model, 'destroy', this.remove);
  },

  removeReview: function () {
    this.model.destroy({success: function(model, response) {
      console.log(model);
      console.log(response);
    }});
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
})