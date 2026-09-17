import db from "../config/db.js";

const Tasks = {
  // Busca usuário por email (usado no login e para evitar duplicados no cadastro)
  async findTasks(user_id) {
    const query = "SELECT * FROM tasks WHERE user_id = $1";
    const { rows } = await db.query(query, [user_id]);
    return rows;
  },
};

export default Tasks;
