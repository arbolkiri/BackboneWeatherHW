//NOTE: In WeatherTemplate need a for loop or something for this weeks temperatures
//Do I need more than one view?
//How to get icons to display?
//Need search button to work
//Couldn't get Router to work
//7daytemplate is not rendering

;
(function(exports) { //backbone model handles communication with REST APIs

    "use strict";
    // var GeoRouter = Backbone.Router.extend({//this isn't routing the way I want it to
    //     routes: {
    //         '': 'index',
    //         'dayview/:name': 'dayview',
    //     },
    //     events: {
    //         "click": "extendedforecast",
    //     },
    //     extendedforecast: function(event){
    //         event.preventDefault();
    //         g.el.innerHTML += "ClickHere!"
    //         Backbone.trigger("extendedforecast")
    //         document.querySelector(".container").innerHTML += "ClickHere!"
    //     },
    //     index: function(){
    //         this.navigate('dayview/today',{
    //             trigger: false,
    //             replace: true
    //             });
    //     },
    //     dayview: function(name) {
    //         debugger;
    //         v.options.view = name;
    //         v.trigger('changeview');

    //     },
    //     initialize: function() {
    //         Backbone.history.start();
    //         m.geofetch();

    //         // console.log(m.geofetch)
    //     }
    // });

    Backbone.GeoModel = Backbone.Model.extend({
        geo: function() {
            var x = $.Deferred(),
                self = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                self.set('position', position, {
                    silent: true
                })
                x.resolve(position);
            }, function(e) {
                x.fail(e)
            }, {
                timeout: 12000, //12s
                maximumAge: 10 * 60 * 1000 //600s, or 10m
            })
            return x;
        },
        geofetch: function() {
            var self = this;
            return this.geo().then(function(position) {
                return self.fetch()
            })
        }
    })

    var GeoWeatherModel = Backbone.GeoModel.extend({
        url: function() {
            return [
                "https://api.forecast.io/forecast/",
                this.get('access_token'),
                "/",
                this.get("position").coords.latitude + ',' + this.get("position").coords.longitude,
                "?callback=?"
            ].join('')
        }
    })

    Backbone.TemplateView = Backbone.View.extend({
        cache: {},
        stream: function(url) {
            var x = $.Deferred();
            if (this.cache[url]) {
                x.resolve(cache[url]);
            } else {
                $.get(url).then((function(d) {
                    // debugger;
                    this.cache[url] = _.template(d);
                    x.resolve(_.template(d));
                }).bind(this));
            }
            return x;
        },
        loadTemplate: function(name) {
            return this.stream('./templates/' + name + '.html');
        },
        initialize: function(options) {
            this.options = options;

            this.model && this.model.on("change", this.render.bind(this));
            // this.on('changeview', this.render, this);
        },
        render: function() {
            var self = this;
            this.loadTemplate(this.options.view).then(function(fn) {
                debugger;
                self.model && (self.el.innerHTML = fn(self.model.toJSON()));
            })
        }
    })

    exports.m = new GeoWeatherModel({
        access_token: "02322886107e3557ebbf8b5358c8179b"
    });

    exports.v = new Backbone.TemplateView({
        view: "Weathertemplate",
        el: ".container",
        model: exports.m
    });
    //  exports.D = new Backbone.TemplateView({
    //     view: "7DayTemplate",
    //     el: ".container",
    //     model: exports.m
    // });
    // exports.g = new GeoRouter();

// console.log(g);

    m.geofetch().then(function(data) {
        data; // { ... } --> data from network request
    // console.log(data);
    });


})(typeof module === "object" ? module.exports : window);
