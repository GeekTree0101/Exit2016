package Vue;

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
import Vue.route.*;

public class server extends AbstractVerticle{

    String IP_address = "192.168.1.9";
    int Port_number = 8000;

    socket_server SocketRoute;


    public void start(){

        System.out.println("[+] Vue test server");

        BridgeOptions opts = new BridgeOptions()
          .addInboundPermitted(new PermittedOptions().setAddress("main.server"))  
          .addOutboundPermitted(new PermittedOptions().setAddressRegex("main.client")); 
       
        SockJSHandler ebHandler = SockJSHandler.create(vertx).bridge(opts); 
   
        EventBus eb = vertx.eventBus(); 
        
        //Create Router
        Router router = Router.router(vertx);
       
        router.route().handler(StaticHandler.create().setWebRoot("./www"));
        SocketRoute.socket_route(router, ebHandler, eb);

        // Create HTTP server
        vertx.createHttpServer().requestHandler(router::accept).listen(Port_number, IP_address);
    }

    
}