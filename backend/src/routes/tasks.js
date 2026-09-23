import express from "express";
const routerTasks = express.Router();
import TaskController from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddlware.js";

routerTasks.get("/", authMiddleware, TaskController.list);
routerTasks.get("/:id", authMiddleware, TaskController.show);
routerTasks.put("/:id", authMiddleware, TaskController.update);
routerTasks.patch("/:id", authMiddleware, TaskController.updateStatus);
routerTasks.post("/", authMiddleware, TaskController.create);
routerTasks.delete("/:id", authMiddleware, TaskController.delete);

export default routerTasks;
