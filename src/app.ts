import express from "express";
import cors from 'cors';
import { DataBaseModel } from "./model/DataBaseModel";
import AlunoController from "./controller/AlunoController";


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

// alunos
server.get('/alunos', AlunoController.todos);
server.post('/cadastrar-aluno', AlunoController.cadastrar);

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