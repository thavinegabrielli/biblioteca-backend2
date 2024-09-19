import { Aluno } from "../model/Aluno";
import { Request, Response } from "express";

class AlunoController extends Aluno {


    static async todos(req: Request, res: Response) {
        try {
            const listaDeAlunos = await Aluno.listarAlunos();

            res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do Aluno");
        }
    }


    static async cadastrar(req: Request, res: Response) {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nome, sobrenome, dataNascimento, endereco, email, celular } = req.body;
            
            // Instanciando objeto Aluno
            const novoAluno = new Aluno(
                nome,
                sobrenome,
                dataNascimento,
                endereco,
                email,
                celular              
            );

            // Chama o método para persistir o aluno no banco de dados
            const result = await Aluno.cadastrarAluno(novoAluno);

            // Verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json(`Aluno cadastrado com sucesso`);
            } else {
                return res.status(400).json('Não foi possível cadastrar o aluno no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o aluno: ${error}`);
            return res.status(400).json('Erro ao cadastrar o aluno');
        }
    }

}

export default AlunoController;