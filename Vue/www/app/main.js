var temp = require("./page/show");

var app = new Vue({

    el: "#start",
    data: {
        state: true,
        title: "Hello Vue x Vertx"
    }
});


var next_page = new Vue({

    el: "#view",
    data: {
        url: "http://192.168.1.9:8000/main/template/show.html"
    },
    methods: {

        clickMessage: function() {

            console.log("url : " + this.url);
            location.href = this.url;
        }
    }
})