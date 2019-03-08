const { writeFile, readFile } = require('fs');
const { promisify } = require('util');
const [writeFileAsync, readFileAsync] = [
    promisify(writeFile),
    promisify(readFile),
];
// outra forma de obter os dados do json
// const dadosJson = require('./herois.json')

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO);

        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        //workaround para simular um id
        const id = heroi.id <= 2 ? heroi.id : Date.now()

        const heroiComId = {
            ...heroi,
            id
        }

        return await this.escreverArquivo([...dados, heroiComId]);
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        // se nao passar o id, traz tudo
        return dados.filter(item => (id ? (item.id === id) : true))
    }

    async remover(id) {
        if (!id) {
            await this.escreverArquivo([])
            return true;
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error('O usuario informado não existe')
        }
        const atual = dados[indice];
        dados.splice(indice, 1)
        await this.escreverArquivo(dados);
        return true;
    }

    async atualizar(id, atualizacoes) {
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error('O heroi informado nao existe')
        }
        const atual = dados[indice]
        dados.splice(indice, 1);

        //workaround para remover valores undefined do objeto
        const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
        const dadoAtualizado = Object.assign({}, atual, objAtualizado);

        return await this.escreverArquivo([...dados, dadoAtualizado]);
    }
}

module.exports = new Database()