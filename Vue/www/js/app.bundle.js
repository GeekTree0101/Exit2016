/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var temp = __webpack_require__(1);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	Vue.component('vue-component', {

	    template: '<h1> Test </h1>'
	})

/***/ }
/******/ ]);