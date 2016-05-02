var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer'
  },

  initialize: function () {
    this.$nameInput = this.$('#name-input');
    this.$styleInput = this.$('#style-input');
    this.$abvInput = this.$('#abv-input');
    this.$imgUrl = this.$('#img-input');

    this.$beerList = this.$('.beer-list');

    this.$beersContainer = this.$('.beers-container');
    this.$reviewsContainer = this.$('.reviews-container');

    this.$registerContainer = this.$('.register-container');

    this.listenTo(this.model.get('beers'), 'add', this.addBeer);
    this.listenTo(this.model.get('beers'), 'reset', this.renderBeers);

    this.listenTo(this.model, 'change:view', this.renderView);
    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);

    this.detailView = null;
  },

  renderView: function () {
    var view = this.model.get('view');

    var viewMap = {
      'beers': this.$beersContainer,
      'reviews': this.$reviewsContainer,
      'register': this.$registerContainer
    };

    // remove the show class from all the 'view' elements
    _.each(viewMap, function(value, key) {
      value.removeClass('show');
    });

    viewMap[view].addClass('show');
  },

  renderDetailView: function () {
    if (this.detailView) {
      this.detailView.remove();
    }

    this.detailView = new BeerDetailView({ model: this.model.get('current_beer')});
  
    this.$reviewsContainer.append(this.detailView.render().el);
  },

  createBeer: function () {
    this.model.get('beers').create({
      name: this.$nameInput.val(),
      style: this.$styleInput.val(),
      abv: this.$abvInput.val(),
      image_url: this.$imgUrl.val()
    }, {wait: true});
  },

  addBeer: function (beer) {
    var beerView = new BeerView({ model: beer });
    this.$beerList.append(beerView.render().el);
  },

  renderBeers: function () {
    this.model.get('beers').each(function (m) {
      this.addBeer(m);
    }, this);
  }
});