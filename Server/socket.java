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

public class socket extends AbstractVerticle{

    public void start(){

        System.out.println("[+] Launched");

        Router router = Router.router(vertx);

        //브릿지 설정
        BridgeOptions opts = new BridgeOptions()
          .addInboundPermitted(new PermittedOptions().setAddress("chat.to.server"))  //서버소켓 이름
          .addOutboundPermitted(new PermittedOptions().setAddress("chat.to.client")); //클라이언트

       
       SockJSHandler ebHandler = SockJSHandler.create(vertx).bridge(opts); //핸들러추가
       
       router.route("/eventbus/*").handler(ebHandler); //핸들러 라우터에 추가
       
       router.route("/main/*").handler(StaticHandler.create()); // 정적페이지 라우터

       EventBus eb = vertx.eventBus();                          // 이벤트 버스

       eb.consumer("chat.to.server").handler(message -> {       // 클라이언트 -> 서버

           String timestamp = DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.MEDIUM)
                                        .format(Date.from(Instant.now()));

           System.out.println(": " + timestamp + " : " + message.body());

           eb.publish("chat.to.client", "OK! " + message.body()); // 서버 -> 클라이언트
       });
    
        vertx.createHttpServer().requestHandler(router::accept).listen(8000, "192.168.1.9");
    }
}