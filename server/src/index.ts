import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// IMPORTAÇÃO DE ROTAS
import projectRoutes from "./routes/project-routes";
import searchRoutes from "./routes/search-routes";
import taskRoutes from "./routes/task-routes";
import userRoutes from "./routes/user-routes";

// CONFIGURAÇÕES
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROTAS
app.use("/projects", projectRoutes);
app.use("/search", searchRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

// SERVIDOR
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
