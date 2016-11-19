import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;

import io.vertx.ext.web.Router;
import io.vertx.ext.web.Cookie;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CookieHandler;

import java.io.*;
import java.util.*;

public class usingRoute extends AbstractVerticle{



    public void start(){    
       
        System.out.println("[+] Launched");

        Router router = Router.router(vertx);
        
        router.route().handler(BodyHandler.create());
        router.route().handler(CookieHandler.create());


        //Routing Test
        router.route("/").handler(routingContext -> {

             routingContext.response()
                           .putHeader("content-type", "text/html")
                           .end("<html><head></head><body><h1> Not Founded 404 </h1><a href='http://localhost:7777/main'> goto </a></body></html>");        
        });
        
        router.route("/main").handler(routingContext -> {

            System.out.println("[+] main router access");

             routingContext.response()
                           .putHeader("content-type", "text/html")
                           .end("<h1> Main page </h1>");
            
        });

        router.route("/user").handler(routingContext -> {

            System.out.println("[+] user router access");

             routingContext.response()
                           .putHeader("content-type", "text/html")
                           .end("<h1> User page </h1>");
            
        });
       
        //ID, Password GET test
        router.route("/Auth/:room/:ID").handler(routingContext -> {

            String temp_room = routingContext.request().getParam("room");
            String temp_ID = routingContext.request().getParam("ID");
            
            routingContext.put("room",temp_room).put("ID",temp_ID);


            if(temp_room.equals("HACKER")){

                System.out.println("HACKER : " + temp_room);
                routingContext.response()
                              .setStatusCode(404)
                              .end("ERROR 404");
            }
            else{
                System.out.println("Welcome : " + temp_room);
                routingContext.reroute("/Room");
            }
        });

        router.route("/Room").handler(routingContext -> {

            String temp_room = routingContext.get("room");
            String temp_ID = routingContext.get("ID");
            

            String get_method = "<html><head></head><body>" +
                        "<h1> Room name : " + temp_room + "</h1>" +
                        "<h3> user ID : " + temp_ID + "</h3>" +
                        "<form method='get' action='http://192.168.1.9:7777/getToken' >" +
                            "ID : <input type='text' name='name' /><br/>" +
                            "PW : <input type='password' name='pw' /><br/>" +
                            "<input type='submit' value='Submit' />" +
                        "</form></body></html>";

            routingContext.response()
                          .putHeader("context-type", "text/html")
                          .end(get_method);

        });




        router.get("/getToken").handler(routingContext -> {

            String user_ID = routingContext.request().getParam("name");
            String user_PW = routingContext.request().getParam("pw");
            System.out.println("[+] Accpet [ID] : " + user_ID + "\n [Password] : " + user_PW);  
            
            String token = "";

            //Auth
            for(int i = 0; i < user_PW.length(); i++){
                char temp = user_PW.charAt(i);
                token += Integer.toString((int)(temp));
            }

            //Make JSON object
            JsonObject obj = new JsonObject();
            obj.put("user_token",token).put("req_ID", user_ID);

            routingContext.response()
                          .putHeader("context-type", "application/json")
                          .end(Json.encode(obj));   //encoding Json <-> decode

        });

        router.get("/getToken").failureHandler( ctx -> {

            System.out.println(ctx.statusCode());
            ctx.response().end("<h1> ERORR 404 </h1>");
        });


        //Routing next handler

        router.route("/Start/:direction").handler(routingContext -> {

            String dir = routingContext.request().getParam("direction");
            System.out.println( "first route : " + dir);

            // Sharing data each router
            routingContext.put("output_text", dir + " Section");    //data put on Context 

            routingContext.response()
                          .setChunked(true)
                          .write("<h1>Waiting </h1> <br/>");
            
            routingContext.vertx().setTimer(2000, tid -> routingContext.next());

        });

        router.route("/Start/:direction").handler(routingContext -> {

            System.out.println("second route");

            routingContext.response()
                          .write("<h1> Start </h1> <br/>");
            
            routingContext.vertx().setTimer(2000, tid -> routingContext.next());

        });

        router.route("/Start/:direction").handler(routingContext -> {


            System.out.println("direction");
            
            String output_text = routingContext.get("output_text"); // data get from Context
            
            routingContext.response()
                          .end("<h1>" + output_text +"</h1>");
        });

        //Re-Route
        router.get("/some/path").handler(routingContext -> {
            System.out.println("1");
            routingContext.put("foo", "bar");
            routingContext.next();  //goto same url name router

        });

        router.get("/some/path/B").handler(routingContext -> {
            
            System.out.println("3");
            routingContext.response().end();
        });

        router.get("/some/path").handler(routingContext -> {
            
            System.out.println("2");
            routingContext.reroute("/some/path/B");
        });


        //MIME
        /* produces : 제공해주는 content-type을 지칭함
        *  consumes : 클라이언트로 부터 오는 content-type을 제한
        */
        router.route("/MIME").produces("text/html").handler(ctx -> {
            
            String str = ctx.getAcceptableContentType();
            System.out.println("Accept able content type : " +str);
            ctx.response()
               .putHeader("content-type", str)
               .end("<h1> test </h1>");
        });

        //Get client localtion language
        router.route("/Local").handler(ctx -> {

            System.out.println(ctx.preferredLocale() +"  user : " + ctx.user());

        });

        //CookieHandler
        /* 쿠키는 클라이언트 측에 정보를 남겨두는 방식을 말한다. [보안성 심각함]
        */
        router.route("/Cookie").handler(ctx -> {

            try{
                Cookie someCookie = ctx.getCookie("mycookie");
                String cookieValue = someCookie.getValue();

                System.out.println("cookie : " + cookieValue);
            }
            catch(Exception e){
                System.out.println("No cookie"  );
            }

            ctx.addCookie(Cookie.cookie("mycookie","somevalue"));

            ctx.response()
               .putHeader("content-type", "text/html")
               .sendFile("./index.html")
               .end();
        });

        vertx.createHttpServer().requestHandler(router::accept).listen(7777);
    }

}

