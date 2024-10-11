import express from "express";
import AlunoController from "./controller/AlunoController";
import LivroController from "./controller/LivroController";
import EmprestimoController from "./controller/EmprestimoController";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })});

// CRUD Aluno
router.get('/alunos', AlunoController.todos);
router.post('/cadastrar-aluno', AlunoController.cadastrar);
router.delete('/remover-aluno', AlunoController.remover);
router.put('/atualizar-aluno', AlunoController.atualizar);

//CRUD Livro
router.get('/livros', LivroController.todos);
router.post('/cadastrar-livro', LivroController.cadastrar);
router.delete('/remover-livro', LivroController.remover);
router.put('/atualizar-livro', LivroController.atualizar);

//CRUD Emprestimo
router.get('/emprestimos', EmprestimoController.todos);
router.post('/cadastrar-emprestimo', EmprestimoController.cadastrar);
router.put('/atualizar-emprestimo', EmprestimoController.atualizar);

export { router }