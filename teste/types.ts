export interface Usuario {
    id : number;
    nome: string;
    email: string;
    sanha?: string;
    dataCadastro: Date;
}

export interface Livro {
    id: number;
    usuario_id: number;
    titulo: string;
    autor: string;
    editor: string;
    estado_conservacao: string;
}

export interface Resenha {
    id: number;
    conteudo: string;
    dataPublicacao: Date;
    livro_id: number;
    usuario_id: number;

}

export interface Troca {
    id:number;
    livro_solicitado_id: number;
    solicitante_id: number;
    proprietario_id: number;
    status: string;
    dataSolicitacao: string;
    dataConclusao?: string;
}