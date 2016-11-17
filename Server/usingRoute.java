import io.vertx.core.AbstractVerticle;
import io.vertx.ext.web.Router;
import java.io.*;
import java.util.*;

public class usingRoute extends AbstractVerticle{


    public void start(){    
       
        System.out.println("[+] Launched");

        Router router = Router.router(vertx);
        
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

        
        vertx.createHttpServer().requestHandler(router::accept).listen(7777);
    }

}