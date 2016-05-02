var UserModel = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: {
    username: '',
    password: '',
  },
  
  url: '/register'
});