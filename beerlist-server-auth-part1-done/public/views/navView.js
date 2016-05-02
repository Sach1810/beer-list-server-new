var NavView = Backbone.View.extend({
  template: Handlebars.compile($('#nav-template').html()),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});