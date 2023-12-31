const express = require('express');
const jwt = require("jsonwebtoken");
const pool = require("./dbconfig");

const router = express.Router();
  
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      const user = result.rows[0];
  
      // Comparação simples da senha
      if (password === user.password) {
        // Gere um token para autenticar o usuário
        const token = jwt.sign({ user: user.id }, "SECRETKEY");
        res.json({ message: "Usuário autenticado com sucesso!", token });
        console.log('Usuário autenticado com sucesso!')
      } else {
        res.status(401).json({ message: "Senha Inválida!" });
      }
    } catch (err) {
      console.error(`Erro ao fazer login: ${err}`);
      res.status(500).json({ message: "Erro no servidor" });
    }
  });
  
  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password]
      );
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error(`Houve um erro ao cadastrar usuário: ${err}`);
      res.status(500).send("Erro no servidor");
    }
  });
  
  router.get("/users", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users");
      res.json(result.rows);
    } catch (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      res.status(500).send("Erro no servidor");
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      console.log("rodando");
    } catch (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      res.status(500).send("Erro no servidor");
    }
  });

  module.exports = router