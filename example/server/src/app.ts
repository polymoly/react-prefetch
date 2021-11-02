import express, { Request as ExRequest, Response as ExResponse } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./build/routes";
import swaggerUi from "swagger-ui-express";
import path from "path";
import cors from "cors";

export const app = express();

app.use(cors());
// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use(
  "/swagger",
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    if (_req.path === "/swagger.json") {
      return res.json(await import("./build/swagger.json"));
    }

    if (_req.path !== "/") {
      return res.sendFile(path.join(__dirname, "swagger-ui-dist", _req.path));
    }

    return res.send(
      swaggerUi.generateHTML(await import("./build/swagger.json")),
    );
  },
);

RegisterRoutes(app);
