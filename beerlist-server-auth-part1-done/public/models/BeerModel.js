var BeerModel = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: function () {
    return {
      name: '',
      style: '',
      image_url: '',
      abv: null,
      edit_mode: false,
      reviews: new ReviewsCollection()
    }
  },

  // when 'reviews' come in from the server, they're an array...
  // this will set them back to being a collection
  parse: function (response) {
    var reviews = this.get('reviews') || new ReviewsCollection();

    reviews.set(response.reviews);
    response.reviews = reviews

    return response;
  }
});