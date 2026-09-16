import { Pool } from "pg";
import "dotenv/config";

// Configura o pool com os dados do PostgreSQL no Docker
const db = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "postgres",
});

// Testa a conexão logo na inicialização
db.connect((err, client, release) => {
  if (err) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", err.message);
  } else {
    release();
    console.log("📦 Conectado com sucesso ao PostgreSQL!");
  }
});

export default db;
