import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import * as helmet from "helmet";
import { ConfigService } from "./Config";
import { Configuration } from "./Config/config.keys";


import https from 'https';
const fs = require('fs');


let httpsServer: https.Server;
let httpsOptions: any;

const Config = new ConfigService();

async function bootstrap() {

      if( process.env.NODE_ENV == 'production'){
        httpsOptions = {
       key: fs.readFileSync('/home/forgecode/domains/api.forgecode.xyz/ssl.key'),
     cert: fs.readFileSync('/home/forgecode/domains/api.forgecode.xyz/ssl.cert'),
       };



      }else{

        httpsOptions = null;
      }
  const app = await NestFactory.create(AppModule, {
    // logger: new LoggerCustomService()
    httpsOptions
  });

  // security and cors ------
  app.use(helmet());
  const allowedOrigins = Config.get(Configuration.allowedOrigins);
  app.enableCors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // return true;
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "Theeee CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  });




  await app.listen(AppModule.port, () => {


    console.log(
      "Servidor NestJs: \x1b[32m",
      "En linea localhost: " + AppModule.port,
      "\x1b[0m"
      );


    });



}
bootstrap();
