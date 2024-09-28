import { Livro } from "../model/Livro";
import { Request, Response} from "express";

/**
 * Controlador para operações relacionadas aos Livros.
*/

class LivroController extends Livro {
    /**
     * Lista todos os livros.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de livros em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeLivros = await Livro.listarLivros();

            res.status(200).json(listaDeLivros);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do Livro");
        }
    }

    /**
     * Cadastra um novo livro.
     * @param req Objeto de requisição HTTP com os dados do aluno.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response) {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { titulo, autor, editora, anoPublicacao, isbn, quantTotal, quantDisponivel, valorAquisicao, statusLivroEmprestado } = req.body;
            
            // Instanciando objeto Livro
            const novoLivro = new Livro(
                titulo,
                autor, 
                editora,
                anoPublicacao,
                isbn,
                quantTotal,
                quantDisponivel,
                valorAquisicao,
                statusLivroEmprestado
            );

            // Chama o método para persistir o livro no banco de dados
            const result = await Livro.cadastrarLivro(novoLivro);

            // Verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json(`Livro cadastrado com sucesso`);
            } else {
                return res.status(400).json('Não foi possível cadastrar o livro no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o livro: ${error}`);
            return res.status(400).json('Erro ao cadastrar o livro');
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
            const idLivro= parseInt(req.query.idLivro as string);
            const result = await Livro.removerLivro(idLivro);
            
            if (result) {
                return res.status(200).json('Livro removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar livro');
            }
        } catch (error) {
            console.log("Erro ao remover o Livro");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}

export default LivroController;


