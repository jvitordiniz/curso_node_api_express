//responsabilidade: envio dos dados ao BD, e definições de regras de negócio
const moment = require('moment')
const conexao = require('../infra/conexao')

class Atendimento{
    adiciona(atendimento,res){
        const dataAgendamento = moment().format('YYYY-MM-DD HH:MM:SS')
        const dataAtendimento = moment(atendimento.dataAtendimento,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(dataAtendimento).isSameOrAfter(dataAgendamento)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                mensagemErro: 'Data deve ser maior ou igual a data atual',
                valido: dataEhValida
            },
            {
                nome: 'cliente',
                mensagemErro: 'Cliente deve conter pelo menos 5 (cinco) caracteres',
                valido: clienteEhValido
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)//filtra campos q estão errados
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{        
                const atendimentoDatado = {...atendimento, dataAgendamento, dataAtendimento}
                const sql = 'INSERT INTO Atendimentos SET ?'
                
                conexao.query(sql, atendimentoDatado, (erro, resultados) =>{
                    if(erro){
                        res.status(400).json(erro)
                    }else{
                        res.status(201).json(atendimento)
                    }
                })
            }
    }

    lista(res){
        const sql = 'select * from atendimentos'
        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados[0])
            }
        })
    }

    altera(id, valores, res){
        if(valores.dataAtendimento){
            valores.dataAtendimento =  moment(valores.dataAtendimento,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') 
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})//retorna somente valores alterados pelo id
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'
        conexao.query(sql, id, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento