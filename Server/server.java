import io.vertx.core.AbstractVerticle;
import java.io.*;
import java.util.*;
import io.vertx.core.WorkerExecutor;
import io.vertx.core.eventbus.EventBus;


public class server extends AbstractVerticle{

	String text = "Vertx server ";
	
	public void start(){

		EventBus eb = vertx.eventBus();

		System.out.println("[+] start server");

		

		vertx.setPeriodic(5000, id -> {     //Timer

			System.out.println("[+] sent event");

			eb.send("miro", "Hey sub server!", reply -> {

				if(reply.succeeded()) {
					System.out.println("[+] Recv reply : " + reply.result().body());
					text = (String)reply.result().body();
				}
				else{
					System.out.println("[-] No reply");
				}
			});
		});
		

		vertx.createHttpServer().requestHandler(req -> {


			String html = "<html><head></head><body><h1>" + text + "</h1><p> This is vert.x server application </p></body></html>";

			System.out.println("[+] user request");

			req.response()
			   .putHeader("content-type", "text/html")
			   .end(html);


		}).listen(9000);
	}
}
