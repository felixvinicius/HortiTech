import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


// ============================
//     AGRICULTORES
// ============================

// Criar Agricultor
app.post('/agricultor/cadastrar', async (req, res) => {
  try {
    const agricultor = await prisma.agricultor.create({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        usuario: req.body.usuario,
        senha: req.body.senha
      }
    });
    res.status(201).json(agricultor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Agricultor
app.post('/agricultor/login', async (req, res) => {
  const { usuario, senha } = req.body;

  const agricultor = await prisma.agricultor.findUnique({
    where: { usuario }
  });

  if (!agricultor || agricultor.senha !== senha) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.status(200).json({ message: "Login bem-sucedido!", agricultor });
});

// Listar Agricultores
app.get('/agricultores', async (req, res) => {
  const list = await prisma.agricultor.findMany();
  res.json(list);
});

// Atualizar Agricultor
app.put('/agricultor/:id', async (req, res) => {
  try {
    const updated = await prisma.agricultor.update({
      where: { id: Number(req.params.id) },
      data: {
        nome: req.body.nome,
        email: req.body.email,
        usuario: req.body.usuario,
        senha: req.body.senha
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar Agricultor
app.delete('/agricultor/:id', async (req, res) => {
  await prisma.agricultor.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Agricultor deletado." });
});



// ============================
//          CLIENTES
// ============================

// Criar Cliente
app.post('/cliente/cadastrar', async (req, res) => {
  try {
    const cliente = await prisma.cliente.create({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        usuario: req.body.usuario,
        senha: req.body.senha
      }
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Cliente
app.post('/cliente/login', async (req, res) => {
  const { usuario, senha } = req.body;

  const cliente = await prisma.cliente.findUnique({
    where: { usuario }
  });

  if (!cliente || cliente.senha !== senha) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.status(200).json({ message: "Login bem-sucedido!", cliente });
});

// Listar Clientes
app.get('/clientes', async (req, res) => {
  const list = await prisma.cliente.findMany();
  res.json(list);
});

// Atualizar Cliente
app.put('/cliente/:id', async (req, res) => {
  try {
    const updated = await prisma.cliente.update({
      where: { id: Number(req.params.id) },
      data: {
        nome: req.body.nome,
        email: req.body.email,
        usuario: req.body.usuario,
        senha: req.body.senha
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar Cliente
app.delete('/cliente/:id', async (req, res) => {
  await prisma.cliente.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Cliente deletado." });
});


// ============================
//         SERVIDOR
// ============================
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
