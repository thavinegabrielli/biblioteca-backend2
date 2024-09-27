import { DataBaseModel } from "./DataBaseModel";

const database = new DataBaseModel().pool;

export class Livro {
    private idLivro: number = 0 ;
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: string;
    private isbn: string;
    private quantTotal: number;
    private quantDisponivel: number;
    private valorAquisicao: number;
    private statusLivroEmprestado: string

    public constructor (_titulo: string, _autor: string, _editora: string, _anoPublicacao: string, 
                               _isbn: string, _quantTotal: number,_quantDisponivel: number, _valorAquisicao: number, _statusLivroEmprestimo: string){
       
        this.titulo                = _titulo;
        this.autor                 = _autor;
        this.editora               = _editora;
        this.anoPublicacao         = _anoPublicacao;
        this.isbn                  = _isbn;
        this.quantTotal            = _quantTotal;
        this.quantDisponivel       = _quantDisponivel;
        this.valorAquisicao        = _valorAquisicao;
        this.statusLivroEmprestado = _statusLivroEmprestimo;
    }

    

}
