import express from "express";
import { SERVER_ROUTES } from "./appConfig";
import AlunoController from "./controller/AlunoController";
import LivroController from "./controller/LivroController";
import EmprestimoController from "./controller/EmprestimoController";
import UsuarioController from "./controller/UsuarioController";
import { upload, uploadCapa } from "./config/multerConfig"; // caminho pode variar dependendo da estrutura
import swaggerUi from "swagger-ui-express"; // Importa a API do swagger
import swaggerOutput from "../docs/swagger_doc.json"; // Importa o arquivo de saída do swagger


const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })
});

// CRUD Aluno
router.get(SERVER_ROUTES.LISTAR_ALUNOS, AlunoController.todos);
router.post(SERVER_ROUTES.NOVO_ALUNO,  AlunoController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_ALUNO, AlunoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_ALUNO, AlunoController.atualizar);

//CRUD Livro
router.get(SERVER_ROUTES.LISTAR_LIVROS, LivroController.todos);
// router.post(SERVER_ROUTES.NOVO_LIVRO, LivroController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_LIVRO, LivroController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_LIVRO, LivroController.atualizar);

//CRUD Emprestimo
router.get(SERVER_ROUTES.LISTAR_EMPRESTIMOS, EmprestimoController.todos);
router.post(SERVER_ROUTES.NOVO_EMPRESTIMO, EmprestimoController.cadastrar);
router.put(SERVER_ROUTES.ATUALIZAR_EMPRESTIMO, EmprestimoController.atualizar);

// Cadastro de Usuário com Upload de Imagem de Perfil
router.post(SERVER_ROUTES.NOVO_USUARIO, upload.single('imagemPerfil'), UsuarioController.cadastrar);
router.post (SERVER_ROUTES.NOVO_LIVRO, uploadCapa.single('imagemCapa'), LivroController.cadastrar);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput)); // Rota para acessar a documentação

export { router }