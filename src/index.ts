import express from "express";
import bodyParser from "body-parser";
import routes from "./route";
import { connectDB } from "./config/dbConnection";
import dotenv from "dotenv";
import yaml from "yamljs";
import swaggerUi from "swagger-ui-express";
dotenv.config();

const swaggerDocument = yaml.load("swagger.yaml");

const app = express();

app.use(bodyParser.json());

// Serve Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// add middleware in route except auth

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
