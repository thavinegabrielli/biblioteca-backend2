import express from "express";
import cors from 'cors';
import { Aluno } from "./model/Aluno";


// Cria o servidor express
const app = express();
// Define a porta que o servidor vai escutar as requisições
const port: number = 3000;

// Habilitando o uso de JSON no servidor express
app.use(express.json());

// Habilitando o uso do CORS para garantir a segurança das requisições
app.use(cors());

// Primeira rota, a rota principal do servidor
app.get('/', (req, res) => {
    console.log('Recebi sua requisição');

    res.send({ mensagem: "Estou devolvendo a resposta para sua requisição" });
});