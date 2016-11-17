import io.vertx.core.AbstractVerticle;
import java.io.*;
import java.util.*;
import io.vertx.core.WorkerExecutor;

import io.vertx.core.eventbus.EventBus;

public class subserver extends AbstractVerticle{

    int count = 0;
	
	public void start(){

		System.out.println("[+] start server");
		EventBus eb = vertx.eventBus();

		eb.consumer("miro", message -> {

			if(count > 2){
				count = 0;
			}

			String rp[] = {"hello world", "MIRO", "awesome vertx"};

			System.out.println("[+] recv from main server : " + message.body());
			message.reply(rp[count]);
			count++;
		});
		

		vertx.createHttpServer().requestHandler(req -> {


			String html = "<html><head></head><body><h1> Hello Vert.x2 </h1><p> This is vert.x server application </p></body></html>";

			System.out.println("[+] user request");

			req.response()
			   .putHeader("content-type", "text/html")
			   .end(html);


		}).listen(8000);
	}
}
