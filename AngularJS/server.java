import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.EventBus;
import io.vertx.ext.web.Router;

import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.PermittedOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;

import java.text.DateFormat;
import java.time.Instant;
import java.util.Date;

import java.io.*;
import java.util.*;

public class server extends AbstractVerticle{

    String IP_address = "192.168.1.9";
    int Port_number = 8000;

    public void start(){

        System.out.println("[+] AngularJS test server");

        //Create Router
        Router router = Router.router(vertx);

        /*
        *  Setting Server
        *
        */
        BridgeOptions opts = new BridgeOptions()
          .addInboundPermitted(new PermittedOptions().setAddress("main.server"))  
          .addOutboundPermitted(new PermittedOptions().setAddress("main.client")); 
       
        SockJSHandler ebHandler = SockJSHandler.create(vertx).bridge(opts); 
   
        EventBus eb = vertx.eventBus(); 
       
        /*
        * Setting Router
        * : /URL_NAME . append handler
        */
        router.route("/main/*").handler(StaticHandler.create().setWebRoot("./www"));
        router.route("/eventbus/*").handler(ebHandler);                          

        /*
        * Setting Socket
        * [33 line] ref : Bridge option
        */
        eb.consumer("main.server").handler(message -> {       

           String timestamp = DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.MEDIUM)
                                        .format(Date.from(Instant.now()));

           System.out.println(": " + timestamp + " : " + message.body());

           eb.publish("main.client", "OK! " + message.body()); 
       });
    

        // Create HTTP server
        vertx.createHttpServer().requestHandler(router::accept).listen(Port_number, IP_address);
    }

    
}