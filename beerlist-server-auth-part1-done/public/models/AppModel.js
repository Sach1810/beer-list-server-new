var AppModel = Backbone.Model.extend({
  defaults: function () {
    return {
      beers: new BeersCollection(),
      current_user: new UserModel(),
      current_beer: null,
      view: 'beers'
    }
  },

  parse: function (response) {
        if (response) {
          var user = new UserModel(response);
          this.set('current_user', user);
        }
  },

  url: '/currentUser',

  initialize: function () {
    this.on('change:current_beer', this._setReviewsUrl);

    // this.notLoggedIn();
  },

  _setReviewsUrl: function () {
    var beer = this.get('current_beer');
    var id = beer.get('_id');

    beer.get('reviews').url = '/beers/' + id + '/reviews';
  }


});