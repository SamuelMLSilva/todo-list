import db from "../config/db.js";

const Tasks = {
  // Busca usuário por email (usado no login e para evitar duplicados no cadastro)
  async findTasks(user_id) {
    const query = "SELECT * FROM tasks WHERE user_id = $1";
    const { rows } = await db.query(query, [user_id]);
    return rows;
  },

  async findTaskId(user_id, id) {
    const query = "SELECT * FROM tasks WHERE user_id = $1 AND id = $2";
    const { rows } = await db.query(query, [user_id, id]);
    return rows[0];
  },

  async create(data) {
    const { user_id, titulo, descricao, status, prioridade, data_vencimento } =
      data;

    const query = `
      INSERT INTO tasks (user_id, titulo, descricao, status, prioridade, data_vencimento)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      user_id,
      titulo,
      descricao,
      status,
      prioridade,
      data_vencimento,
    ];
    const { rows } = await db.query(query, values);

    return rows[0]; // Retorna a tarefa recém-criada como um objeto
  },
};

export default Tasks;
