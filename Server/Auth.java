import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;

import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.User;

import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.jwt.JWTOptions;

import io.vertx.ext.web.handler.JWTAuthHandler;

import io.vertx.ext.web.Router;

import java.io.*;
import java.util.*;


public class Auth extends AbstractVerticle{

    

    public void start(){

        System.out.println("[+] Launched");

        Router router = Router.router(vertx);
        
        JsonObject authConfig = new JsonObject()
        .put("keyStore", new JsonObject()
        .put("type", "jceks")
        .put("path", "keystore.jceks")
        .put("password", "secret"));


        JWTAuth authProvider = JWTAuth.create(vertx, authConfig);

        router.route("/main").handler(ctx -> {

            ctx.response()
               .putHeader("content-type", "text/html")
               .sendFile("./login.html");

        });

        router.route("/Auth").handler(ctx -> {

            String id = ctx.request().getParam("id");
            String pw = ctx.request().getParam("password");

            System.out.println(id + " : " + pw);

            if("hellowrold".equals(id) && "12345".equals(pw)){

                System.out.println("[+] Auth Success");

                ctx.response()
                   .end(authProvider.generateToken(new JsonObject().put("token","miro"), new JWTOptions()));
            }
            else{

                System.out.println("[-] Auth Failed");
                
                ctx.fail(401);
            }

        });

        vertx.createHttpServer().requestHandler(router::accept).listen(8000);

    }

}