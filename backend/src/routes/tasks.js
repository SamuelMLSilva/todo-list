import express from "express";
const routerTasks = express.Router();
import TaskController from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddlware.js";

routerTasks.get("/", authMiddleware, TaskController.list);
routerTasks.post("/", authMiddleware, TaskController.create);

export default routerTasks;
