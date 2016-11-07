

vertx.createHttpServer()
     .requestHandler(function(req){


        var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger(className);
	logger.info("[+] User request");

	req.response()
	   .putHeader("content-type","text/plain")
           .end("hello world hello vertx");
}).listen(1234);
