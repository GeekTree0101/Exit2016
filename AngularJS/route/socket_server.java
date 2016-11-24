package AngularJS.route;

import io.vertx.core.eventbus.EventBus;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.PermittedOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;

import java.text.DateFormat;
import java.time.Instant;
import java.util.Date;

import java.io.*;
import java.util.*;

public class socket_server{

    public static void socket_route(Router router, SockJSHandler ebHandler, EventBus eb){

        router.route("/eventbus/*").handler(ebHandler);                          

        /*
        * Setting Socket
        * [33 line] ref : Bridge option
        */
        eb.consumer("main.server").handler(message -> {       

           String timestamp = DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.MEDIUM)
                                        .format(Date.from(Instant.now()));

           System.out.println(": " + timestamp + " : " + message.body());
           
           
           eb.publish("main.client", message.body()); 
       });
    
    }
    
}