var BeerDetailView = Backbone.View.extend({
  tagName: 'reviews-container-inner',

  template: Handlebars.compile($('#beer-detail-template').html()),

  events: {
    'click .submit-review': 'createReview'
  },

  initialize: function () {
    this.listenTo(this.model.get('reviews'), 'add', this.addReview);
    this.listenTo(this.model.get('reviews'), 'reset', this.render);
  },

  createReview: function () {
    this.model.get('reviews').create({
      name: this.$nameInput.val(),
      text: this.$notesInput.val(),
    }, {wait: true});
  },

  addReview: function (review) {
    var reviewView = new ReviewView({ model: review });
    this.$reviewList.append(reviewView.render().el);
  },

  renderReviews: function () {
    this.model.get('reviews').each(function (m) {
      this.addReview(m);
    }, this);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    this.$nameInput = this.$('#review-name-input');
    this.$notesInput = this.$('#review-notes-input');

    this.$reviewList = this.$('.reviews-list');

    this.renderReviews();

    return this;
  }
});