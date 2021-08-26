class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criarAtendimentos()
        this.criarServicos()
    }
    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(ID))'
        this.conexao.query(sql, (erro) =>{
            if(erro){
                console.log(erro)
            }else{
                console.log('Tabela Atendimentos chamada com sucesso')
            }
        } )
    }
    criarServicos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Servicos (id int NOT NULL AUTO_INCREMENT, servico varchar(20) NOT NULL, preco double NOT NULL, PRIMARY KEY(ID))'
        this.conexao.query(sql, (erro) =>{
            if(erro){
                console.log(erro)
            }else{
                console.log('Tabela Serviços chamada com sucesso')
            }
        } )      
    }
}

module.exports = new Tabelas