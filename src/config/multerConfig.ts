import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Função para gerar nome aleatório com 16 caracteres alfanuméricos
function gerarNomeAleatorio(extensao: string) {
  const caracteres = crypto.randomBytes(12).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  return '${caracteres}${extensao}';
}

// Configuração para arquivos gerais
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeArquivo = gerarNomeAleatorio(ext);
    cb(null, nomeArquivo);
  }
});

export const upload = multer({ storage });

// Configuração para capas de livros
const storageCapa = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads/cover'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeArquivo = gerarNomeAleatorio(ext);
    cb(null, nomeArquivo);
  }
});

export const uploadCapa = multer({ storage: storageCapa });