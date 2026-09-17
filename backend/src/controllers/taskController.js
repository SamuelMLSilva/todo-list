import Task from "../models/tasks.js";

const TaskController = {
  async list(req, res) {
    try {
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(500).json({ error: "Usuário inválido." });
      }

      const tasks = await Task.findTasks(user_id);

      return res.status(201).json({
        message: "Tasks consultadas com sucesso!",
        tasks,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar tarefas." });
    }
  },
};

export default TaskController;
