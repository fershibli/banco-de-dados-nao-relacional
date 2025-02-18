//tipo de Dados
//String, Number, Boolean, Date, ObjectID
//Array, Object

use('estoque')
db.categorias.insertOne({
    nome: 'Bebidas',
    ativo: true
})

//select * from categorias
use('estoque')
db.categorias.find({}, {})

use('estoque')
db.categorias.insertOne({
    _id: '123',
    nome: 'Sobremesas',
    ativo: true
})

use('estoque')
db.categorias.find({}, { _id: 0, nome: 1 })

use('estoque')
db.categorias.insertMany([
    { nome: 'Entradas', ativo: true },
    { nome: 'Pães', ativo: false }
])

use('estoque')
db.produtos.insertOne({
    _id: "124",
    nome: 'Hambúrguer Gourmet',
    preco: 35.99,
    ingredientes: ["pão", "carne", "queijo", "alface", "tomate"],
    vegetariano: false,
    dataCadastro: new Date()

})

use('estoque')
db.produtos.find()

use('estoque')
db.produtos.insertOne({ abobrinha: "tem" })

use('estoque')
db.produtos.drop()

use('estoque')
db.createCollection('produtos',
    {
        validator: {
            $jsonSchema: {
                'bsonType': 'object',
                'required': ['_id', 'nome', 'preco',
                    'ingredientes', 'vegetariano',
                    'dataCadastro']
            }
        }
    })
//Obter as informações da collection
use('estoque')
db.getCollectionInfos({ name: 'produtos' })

use('estoque')
try {
    db.produtos.insertOne({ abobrinha: "tem" })
} catch (err) {
    printjson(err)
}

//Volta do intervalo
use('estoque')
db.estados.insertMany([
    {
        sigla: 'SP', nome: 'São Paulo',
        populacao: 12000000
    },
    {
        sigla: 'AC', nome: 'Acre',
        populacao: 712000
    },
    {
        sigla: 'RJ', nome: 'Rio de Janeiro',
        populacao: 2500000
    }
])
use('estoque')
db.estados.find({}, //filtros
    {} //atributos a serem exibidos
)
use('estoque')
db.estados.find({ sigla: { $eq: 'SP' } }, { nome: 1 })

use('estoque')
db.estados.find({ nome: /^rio/i }, { _id: 0, nome: 1 })

// i = case insensitive
// ^ = começa com
// $ = termina com
// . = qualquer caractere
// * = zero ou mais
// + = um ou mais
// ? = zero ou um
// {n} = exatamente n vezes
// {n,} = no mínimo n vezes
// {n,m} = no mínimo n vezes e no máximo m vezes

use('estoque')
db.estados.find({ nome: /o$/i }, { _id: 0, nome: 1 })

use('estoque')
db.estados.find({ populacao: { $gt: 11000000 } })