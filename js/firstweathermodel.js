    // var WeatherModel = Backbone.Model.extend({
    //     url: function() { //url is property?
    //         return ["https:api.forecast.io/forecast/",
    //             this.get('access_token'),
    //             "/",
    //             this.get("lat") + ',' + //-> handling $.get
    //             this.get("lng"), //lat & lng declared in defaults; they are attributes
    //             "?callback=?"
    //         ].join('')
    //     },
    //     defaults: { //this is actually a function
    //         forecast: "Coldfront",
    //         lat: 5,
    //         lng: 5
    //     },
    //     validate: function(attrs) { //--built-in if data is invalid, like a test
    //         if (attrs.lat === 0 || attrs.lng === 0) {
    //             return "Lat or lng are not set.";
    //         }
    //     },
    //     initialize: function() {
    //         this.on("change", function(model, options) { //--is this like a trigger?
    //             console.log("something changed")
    //         })
    //         this.on("change:forecast", function(model, value, options) {
    //             console.log("forecast changed")
    //         })
    //         this.on("invalid", function(model, errorMessage, options) {
    //             alert("This is an error message.")
    //         })

    //     }
    // });



    // exports.instance = new WeatherModel({
    //     access_token: "02322886107e3557ebbf8b5358c8179b"