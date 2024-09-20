import { Aluno } from "../model/Aluno";
import { Request, Response } from "express";

/**
 * Controlador para operações relacionadas aos alunos.
 */
class AlunoController extends Aluno {

    /**
     * Lista todos os alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de alunos em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeAlunos = await Aluno.listarAlunos();

            res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do Aluno");
        }
    }

   /**
     * Cadastra um novo aluno.
     * @param req Objeto de requisição HTTP com os dados do aluno.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
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

    /**
     * Remove um aluno.
     * @param req Objeto de requisição HTTP com o ID do aluno a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAluno = parseInt(req.query.idAluno as string);
            const result = await Aluno.removerAluno(idAluno);
            
            if (result) {
                return res.status(200).json('Aluno removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar aluno');
            }
        } catch (error) {
            console.log("Error on controller method remover");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}

export default AlunoController;