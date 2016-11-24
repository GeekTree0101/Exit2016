import { Component, AfterContentInit } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl : './main/template/app.component.html'
})
export class AppComponent {

  private user : string;
  private room : string;
  private insert_data = "";

  private title_state = {
    title : "ChatChat",
    hide : false
  }

  start(){

    console.log("[+] make room");

    this.user = window.prompt("Insert your ID"); 
    this.room = window.prompt("Insert room name");
    if(this.user == null ||this.room == null){
      alert("다시입력해주세요.");
    }
    else if(this.user.length < 2 || this.room.length < 2){
       alert("다시입력해주세요.");
    }
    else{
      this.title_state.hide = true;
      this.title_state.title = "Welcome " + this.user + ", room : " + this.room ;
      this.connection();
    }
  }

  connection(){

        let user_name = this.user;

        (<any>window).eb = new (<any>window).EventBus('/eventbus/');
        (<any>window).eb.onopen = function() {

            console.log("[+] opened");
            
             (<any>window).eb.registerHandler("main.client", function(err, msg) {

                console.log("[+] recv : ", msg.body);

                if(msg.body.name != user_name){
                  console.log(msg.body.name);
                  console.log(user_name);
                  var dom = document.createElement("div");
                  dom.className = "friend";
                  dom.innerHTML = "<label>" + msg.body.name + "</label>" +
                        "<p>" + msg.body.message + "</p>";
                  var select = document.getElementsByClassName("chetarea");
                  select[0].appendChild(dom);
                  document.scrollingElement.scrollTop = 999999999;
                }
            });

        };  
  }

  exit_room(){

      console.log("[+] exit room");

      (<any>window).eb.close = function(){
        console.log("[+] close success");
      }

      this.title_state.hide = false;
      this.title_state.title =  "ChatChat";
  }

  text(event : any){
    this.insert_data = event.target.value;
  }

  send_message(){
      console.log("[+] send message : " , this.insert_data);
      
      var dom = document.createElement("div");
      dom.className = "me";
      dom.innerHTML = "<label>" + this.user + "</label>" +
                      "<p>" + this.insert_data + "</p>";
      var select = document.getElementsByClassName("chetarea");
      select[0].appendChild(dom);
      document.scrollingElement.scrollTop = 999999999;
      (<any>window).eb.publish("main.server", 
      {
        name : this.user,
        message : this.insert_data
      });
  }



}