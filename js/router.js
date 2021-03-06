var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var homeView = require('./views/homeVw'),
    userPageView = require('./views/userPageVw'),
    aboutView = require('./views/aboutVw'),
    donateView = require('./views/donateVw'),
    settingsView = require('./views/settingsVw');

module.exports = Backbone.Router.extend({

  initialize: function(options){
    this.options = options || {};
    /*
    expects options.userModel from app.js
     */
    //this.socketView = new socketView({model: options.userModel});
    this.socketView = options.socketView;
  },

  routes: {
    "": "index",
    "home": "home",
    "myPage": "userPage",
    "userPage": "userPage",
    "userPage/:userID(/:state)(/:itemHash)": "userPage",
    "customizePage": "customizePage",
    "sellItem": "sellItem",
    "purchases": "purchases",
    "sales": "sales",
    "cases": "cases",
    "notifications": "notifications",
    "settings": "settings",
    "about": "about",
    "support": "donate"
  },

  cleanup: function(){
    "use strict";
    $('.js-loadingModal').addClass('hide'); //hide modal if it is still visible
  },

  newView: function(view){
    "use strict";
    $('body').removeClass("userPage");//add other body style classes if they are created
    $('#obContainer').removeClass("box-borderDashed"); //remove customization styling if present
    this.view && (this.view.close ? this.view.close() : this.view.remove());
    this.view = view;
    //clear address bar. This will be replaced on the user page
    window.obEventBus.trigger("setAddressBar", "");
  },

  index: function(){
    "use strict";
    if(this.options.userModel.get('beenSet') === true){
      this.home();
    } else {
      this.userPage();
    }
  },

  home: function(){
    "use strict";
    this.cleanup();
    this.newView(new homeView({
      userModel: this.options.userModel,
      socketView: this.socketView
    }));
  },

  userPage: function(userID, state, itemHash){
    "use strict";
    this.cleanup();
    this.newView(new userPageView({
      userModel: this.options.userModel,
      userID: userID,
      state: state,
      itemHash: itemHash,
      socketView: this.socketView
    }));
    $('body').addClass("userPage");
  },

  customizePage: function(){
    "use strict";
    this.cleanup();
    console.log("customizePage");
  },

  sellItem: function(){
    "use strict";
    this.cleanup();
    this.newView(new userPageView({
      userModel: this.options.userModel,
      userID: this.options.userModel.get('guid'),
      state: 'itemNew'
    }));
    $('body').addClass("userPage");
  },

  purchases: function(){
    "use strict";
    this.cleanup();
    console.log("purchases");
  },

  sales: function(){
    "use strict";
    this.cleanup();
    console.log("sales");
  },

  cases: function(){
    "use strict";
    this.cleanup();
    console.log("cases");
  },

  notifications: function(){
    "use strict";
    this.cleanup();
    console.log("notifications");
  },

  settings: function(){
    "use strict";
    this.cleanup();
    this.newView(new settingsView({userModel: this.options.userModel}));
  },

  about: function(){
    "use strict";
    this.cleanup();
    this.newView(new aboutView());
  },

  donate: function(){
    "use strict";
    this.cleanup();
    this.newView(new donateView());
  }

});
