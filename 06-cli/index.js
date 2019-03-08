const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', 'Poder do Heroi')
        .option('-i, --id [value]', 'Id do Heroi')

        .option('-c, --cadastrar', 'Cadastrar um heroi')
        .option('-l, --listar', 'Listar um heroi')
        .option('-r, --remover', 'Remove um heroi pelo id')
        .option('-a, --atualizar [value]', 'Atualizar um heroi pelo id')
        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {
        /**
         * node index --cadastrar params...
         * node index -c -n Hulk -p Forca
         */
        if (Commander.cadastrar) {
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('Heroi não foi cadastrar')
                return;
            }
            console.log('Heroi Cadastrado com sucesso!');

        }
        /**
         * node index --listar
         * node index -r
         * node index -r 1
         */
        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        /**
         * node index --remover
         * node index -r 1
         */
        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if (!resultado) {
                console.error('Não foi possivel remover o heroi')
                return;
            }
            console.log('Heroi removido com sucesso')
        }
        /**
         * node index --atualizar
         * node index -u 1 -n papa
         * node index -u 1 -n thor -p trovao
         */
        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            // remover todas as chaves que estivere com underfined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if (!resultado) {
                console.error('Não foi possivel atualizar o heroi')
                return;
            }
            console.log('Heroi Atualizado com sucesso')

        }
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()