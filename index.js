const express = require('express')
const cors = require('cors')
const port = 3000

const app = express()
app.use(cors())
app.use(express.json())

const usuarios = [
  { nome: "Guilherme", email: "g@mail.com", senha: "123456" }
];
app.post('/usuarios/registro', (req, res) => {
  // 1. obter informações
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;

  // validando
  if (!nome || !email || !senha) {
    res.status(400).send({ error: 'Nome, email ou senha não informado!' })
    return;
  }

  let usuarioJaRegistrado;
  for (let i = 0; i < usuarios.length; i++) {
    const u = usuarios[i];
    if (u.email === email) {
      usuarioJaRegistrado = u;
      break;
    }
  }
  if (usuarioJaRegistrado) {
    res.status(400).send({ error: 'Usuário já registrado!' })
    return;
  }

  // 2. adicionar no array de usuarios
  // um objeto com essas propriedades acima
  const usuario = { nome, email, senha };
  usuarios.push(usuario)
  
  // 3. retornar o usuario registrado
  res.send({ usuario })
})

app.get('/usuarios', (req, res) => {
  res.send({ usuarios: usuarios })
})

app.post('/usuarios/login', (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  /*
  let usuario;
  for (let i = 0; i < usuarios.length; i++) {
    const u = usuarios[i];
    if (u.email === email) {
      usuario = u;
      break;
    }
  }*/

  let usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    res.status(400).send({ error: 'Usuário não encontrado' })
    return;
  }

  if (usuario.senha !== senha) {
    res.status(400).send({ error: 'Senha inválida' })
    return;
  }

  res.send({ usuario: usuario })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
