$(document).ready(function () {
    
  var discoJSON = 'json/disco.json';

  var Discography = Backbone.Model.extend({
    // Initalize discography model
  });

  // Collections
  // engineer, film, prod, remix, seq, tv
  var TvCredits = Backbone.Collection.extend({
    url: discoJSON,
    model: Discography,
    initialize: function(){
      console.log("TV Credits initialized");
    },
    parse: function(response) {
      var credits = {};
      credits = response.credits.tv;
      return credits;
    }
  });

  var FilmCredits = Backbone.Collection.extend({
    url: discoJSON,
    model: Discography,
    initialize: function(){
      console.log("Film Credits initialized");
    },
    parse: function(response) {
      var credits = {};
      credits = response.credits.film;
      return credits;
    }
  });

  var ProdCredits = Backbone.Collection.extend({
    url: discoJSON,
    model: Discography,
    initialize: function(){
      console.log("Prod Credits initialized");
    },
    parse: function(response) {
      var credits = {};
      credits = response.credits.prod;
      return credits;
    }
  });

  var RemixCredits = Backbone.Collection.extend({
    url: discoJSON,
    model: Discography,
    initialize: function(){
      console.log("Remix Credits initialized");
    },
    parse: function(response) {
      var credits = {};
      credits = response.credits.remix;
      return credits;
    }
  });

  var SeqCredits = Backbone.Collection.extend({
    url: discoJSON,
    model: Discography,
    initialize: function(){
      console.log("Seq Credits initialized");
    },
    parse: function(response) {
      var credits = {};
      credits = response.credits.seq;
      return credits;
    }
  });

  var EngCredits = Backbone.Collection.extend({
    url: discoJSON,
    model: Discography,
    initialize: function(){
      console.log("Eng Credits initialized");
    },
    parse: function(response) {
      var credits = {};
      credits = response.credits.eng;
      return credits;
    }
  });

  // Views
  var ItemView = Backbone.View.extend({
    tagname:  'table',
    template: _.template($('#tv-item-template').html()),
    events: {},
    initialize: function () {},
    render: function () {
      console.dir(this.model.attributes);
      $(this.el).html(this.template(this.model.attributes));
      return this;
    }
  });

  var ContainerView = Backbone.View.extend({
    
    tagname: 'article',
    
    template: _.template($('#article-template').html()),

    initialize: function (options) {
      console.log('[ContainerView] initalized');
      $(this.el).html(this.template({title: options.title}));
    },

    render: function (options) {
      console.log('[ContainerView] render');
      var i = 0;
      var ret = '';
      var self = this;
      this.collection.each(function(item) {
        console.dir(self.options.section);  
        var view = new ItemView({model: item, section: self.options.section});
        self.$('article .items').append(view.render().el);
      });
      return this;
    }

  });

  var AppView = Backbone.View.extend({
      
    el: $('#app'),

    initialize: function () {
      
      // Initalize TV collection
      var tvCredits = new TvCredits();
      // Fetch and render tv
      tvCredits.fetch({success: $.proxy(function () {
        this.drawTv(tvCredits);
      }, this)});

      // Initalize Film collection
      var filmCredits = new FilmCredits();
      // Fetch and render film
      filmCredits.fetch({success: $.proxy(function () {
        this.drawFilm(filmCredits);
      }, this)});

      // Initalize Production collection
      var prodCredits = new ProdCredits();
      // Fetch and render prod
      prodCredits.fetch({success: $.proxy(function () {
        this.drawProd(prodCredits);
      }, this)});

      // Initalize Remix collection
      var remixCredits = new RemixCredits();
      // Fetch and render remix
      remixCredits.fetch({success: $.proxy(function () {
        this.drawRemix(remixCredits);
      }, this)});

      // Initalize Engineer collection
      var engCredits = new EngCredits();
      // Fetch and render film
      engCredits.fetch({success: $.proxy(function () {
        this.drawEng(engCredits);
      }, this)});

      // Initalize Sequencer collection
      var seqCredits = new SeqCredits();
      // Fetch and render film
      seqCredits.fetch({success: $.proxy(function () {
        this.drawSeq(seqCredits);
      }, this)});

    },

    drawTv: function(tvCredits) {
      console.log('draw tv');
      var tvCredits = new ContainerView({section: 'tv', collection: tvCredits, title: 'Television Credits'});
      $('#app').append(tvCredits.render().el);
    },

    drawFilm: function(filmCredits) {
      console.log('draw film');
      var filmCredits = new ContainerView({section: 'film', collection: filmCredits, title: 'Film Credits'});
      $('#app').append(filmCredits.render().el);
    },

    drawProd: function(prodCredits) {
      console.log('draw prod');
      var prodCredits = new ContainerView({section: 'prod', collection: prodCredits, title: 'Production Credits'});
      $('#app').append(prodCredits.render().el);
    },

    drawRemix: function(remixCredits) {
      console.log('draw remix');
      var remixCredits = new ContainerView({section: 'remix', collection: remixCredits, title: 'Remix Credits'});
      $('#app').append(remixCredits.render().el);
    },

    drawEng: function(engCredits) {
      console.log('draw eng');
      var engCredits = new ContainerView({section: 'eng', collection: engCredits, title: 'Engineering Credits'});
      $('#app').append(engCredits.render().el);
    },

    drawSeq: function(seqCredits) {
      console.log('draw seq');
      var seqCredits = new ContainerView({section: 'seq', collection: seqCredits, title: 'Sequencing Credits'});
      $('#app').append(seqCredits.render().el);
    }

  });

  // Init app
  var App = new AppView();

});
