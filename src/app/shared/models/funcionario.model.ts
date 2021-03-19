import { Lancamento } from './lancamento.model';

export class Funcionario {

  constructor(
    public nome: string,
    public email: string,
    public cpf: string,
    public perfil: string,
    public valorHora?: string,
    public qtdValorHorasTrabalhoDia?: string,
    public qtdValorHorasAlmoco?: string,
    public lancamentos?: Lancamento[],
    public id?: string
    ) {}
}
