import { Component, AfterContentInit } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl : './main/template/app.component.html'
})
export class AppComponent {

  private user : string;
  private room : string;

  private title_state = {
    title : "ChatYa!",
    hide : false
  }

  private show_up_chet_panel = true;

  ngAfterContentInit() {

        var eb = new (<any>window).EventBus('/eventbus/');
        (<any>window).eb = eb; //debug

        eb.onopen = function() {

            console.log("[+] opened");
            eb.registerHandler("main.client", function(err, msg) {

                console.log("[+] recv : " + msg.body);
            });

            setInterval(() => {
                eb.publish("main.server", "hello?");
            },2000);
        };


  }

  visit_room(){
    
    this.user = window.prompt("Insert your ID"); 
    this.room = window.prompt("Insert room name");
    this.title_state.hide = true;
    this.show_up_chet_panel = false;

  }
}