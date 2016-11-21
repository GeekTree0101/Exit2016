"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.title_state = {
            title: "ChatYa!",
            hide: false
        };
        this.show_up_chet_panel = true;
    }
    AppComponent.prototype.ngAfterContentInit = function () {
        var eb = new window.EventBus('/eventbus/');
        window.eb = eb; //debug
        eb.onopen = function () {
            console.log("[+] opened");
            eb.registerHandler("main.client", function (err, msg) {
                console.log("[+] recv : " + msg.body);
            });
            setInterval(function () {
                eb.publish("main.server", "hello?");
            }, 2000);
        };
    };
    AppComponent.prototype.visit_room = function () {
        this.user = window.prompt("Insert your ID");
        this.room = window.prompt("Insert room name");
        this.title_state.hide = true;
        this.show_up_chet_panel = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './main/app/app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map