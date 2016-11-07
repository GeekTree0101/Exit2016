import io.vertx.core.AbstractVerticle;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import java.io.*;
import java.util.*;

public class server extends AbstractVerticle{

	private Logger logger = LoggerFactory.getLogger(getClass());	

	public void start(){

		logger.info("[+] start server");

		vertx.createHttpServer().requestHandler(req -> {


			logger.info("[+] user request");
			logger.info(req);
			req.response()
			   .putHeader("content-type", "text/plain")
			   .end("hello world hello miro");
		}).listen(9000);
	}
}
