//Tipos de Dados
//String, Number, Boolean, Date, ObjectID
//Array, Object
use('estoque')
db.categorias.insertOne({nome:'Bebidas', 
    ativo:true})
use('estoque')
//select * from categorias
db.categorias.find({},{})

use('estoque')
db.categorias.insertOne({_id: '123',
    nome:'Sobremesas', 
    ativo:true})
use('estoque')
db.categorias.find({},{_id:1, nome:1})

use('estoque')
db.categorias.insertMany([
    {nome:'Entradas', ativo:true},
    {nome:'Pães', ativo:false}
])
use('estoque')
db.produtos.insertOne({
    _id: '125',
    preco: 40.00,
    nome: 'Hambúrguer Podrão',
    ingredientes: ["pão", "carne", "queijo",
        "alface", "tomate"],
    vegetariano: false,
    dataCadastro: new Date(),
    calorias: {
        total: 780,
        porcoes: 1
    }
})
use('estoque')
db.produtos.find()
use('estoque')
db.produtos.insertOne({abobrinha:"tem"})
use('estoque')
db.produtos.drop() //dropa a collection
use('estoque')
db.createCollection('produtos',{
    validator: {
        $jsonSchema: {
            'bsonType':'object',
            'required':['_id','nome','preco',
'ingredientes','vegetariano','dataCadastro'
            ]
        }
    }
})
//Obter as informações da collection
use('estoque')
db.getCollectionInfos({name:'produtos'})

use('estoque')
try{
  db.produtos.insertOne({abobrinha:"tem"})
} catch (err){
    printjson(err)
}
use('estoque')
db.estados.insertMany([
    {sigla: 'SP', nome:'São Paulo', 
     populacao: 12000000},
    {sigla: 'AC', nome:'Acre',
     populacao: 712000},
    {sigla: 'RJ', nome: 'Rio de Janeiro',
     populacao: 2500000
    } 
])
use('estoque')
db.estados.find({},//filtros
                {} //atributos a serem exibidos  
)
use('estoque')
// select nome from estados where sigla='SP'
db.estados.find({sigla: {$eq: 'SP'}},
                {_id:0, nome:1})

use('estoque')
//i = insensitive case
//$ =que termine
//^ =que inicie
db.estados.find({nome: /paulo/i},{_id:0, nome:1})
use('estoque')
//select * from estados where populacao >=11000000
db.estados.find({populacao: {$lt: 12000001}})
//select * from estados where sigla in ('AC','RJ')
use('estoque')
db.estados.find({sigla: {$in: ['AC','RJ']}})
//select * from estados where sigla='RJ' OR sigla='AC'
use('estoque')
db.estados.find({
    $or : [
        {sigla: {$eq: 'RJ'}},
        {sigla: {$eq: 'AC'}}
    ]
},{_id:0, sigla:1, nome:1})

//delete
use('estoque')
db.estados.deleteOne({sigla: 'AC'})
db.estados.deleteOne({sigla: {$eq: 'AC'}})
use('estoque')
db.estados.deleteMany({nome: /o/i})
//update
use('estoque')
db.estados.updateOne({sigla: {$eq: 'AC'}},
    {$set: {populacao: 1000}}
)
use('estoque')
db.estados.find({sigla: 'AC'})

use('estoque')
db.estados.updateMany({nome: /o/i},
    {$set: {pais: 'Brasil'}}
)
use('estoque')
db.estados.find()


