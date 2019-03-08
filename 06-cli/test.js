const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Laterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

describe('Suite de manipulação de Herios', () => {
    before(async () => {
        await database.remover();
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um herio, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.listar(1)

        deepEqual(resultado[0], expected)
    })
    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [realResult] = await database.listar(expected.id)

        deepEqual(realResult, expected)
    })
    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(resultado, expected);
    })
    it('deve atualizar um heroi por id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(expected.id, {
            nome: expected.nome,
            poder: expected.poder,
        });

        const [realResult] = await database.listar(expected.id);
        deepEqual(realResult, expected);
    })
})