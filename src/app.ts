import express from "express";
import cors from 'cors';
import { DataBaseModel } from "./model/DataBaseModel";
import AlunoController from "./controller/AlunoController";
import LivroController from "./controller/LivroController";


// Cria o servidor express
const app = express();
// Define a porta que o servidor vai escutar as requisições
const port: number = 3000;

// criando servidor web
const server = express();
server.use(cors());
server.use(express.json());

// rota principal da aplicação
server.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" });
});

// CRUD Aluno
server.get('/alunos', AlunoController.todos);
server.post('/cadastrar-aluno', AlunoController.cadastrar);
server.delete('/remover-aluno', AlunoController.remover);
server.put('/atualizar-aluno', AlunoController.atualizar);

//CRUD Livro
server.get('/livros', LivroController.todos);
server.post('/cadastrar-livro', LivroController.cadastrar);
server.delete('/remover-livro', LivroController.remover);


new DataBaseModel().testeConexao().then((resdb) => {
    if (resdb) {
        console.clear();
        console.log("Conexão com banco de dados realizada com sucesso!");
        // iniciando o servidor
        server.listen(port, () => {
            console.log(`Servidor iniciado no endereço http://localhost:${port}`);
        });
    } else {
        console.log("Erro ao conectar com o banco de dados");
    }
});