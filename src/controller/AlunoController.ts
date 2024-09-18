import { Aluno } from "../model/Aluno";
import { Request, Response } from "express";

class AlunoController extends Aluno {
    static async todos(req: Request, res: Response) {
        try {
            const listaDeAlunos = await Aluno.listarAlunos();

            res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações de pessoas");
        }
    }

}

export default AlunoController;