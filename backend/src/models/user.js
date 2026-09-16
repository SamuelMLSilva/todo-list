import db from "../config/db.js";

const User = {
  // Busca usuário por email (usado no login e para evitar duplicados no cadastro)
  async findByEmail(email) {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await db.query(query, [email]);
    return rows[0];
  },

  // Insere um novo usuário já com o hash da senha
  async create({ nome, email, password }) {
    const query = `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email, criado_em
    `;
    const values = [nome, email, password];
    const { rows } = await db.query(query, values);
    return rows[0];
  },
};

export default User;
