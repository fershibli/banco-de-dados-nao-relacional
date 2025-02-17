//tipo de Dados
//String, Number, Boolean, Date, ObjectID
//Array, Object
 
use('estoque')
db.categorias.insertOne({nome: 'Bebidas',
    ativo:true})
 
//select * from categorias
use('estoque')
db.categorias.find({},{})
 
use('estoque')
db.categorias.insertOne({_id: '123',
    nome:'Sobremesas',
    ativo:true})
 
use('estoque')
db.categorias.find({},{_id:0, nome:1})
 
use('estoque')
db.categorias.insertMany([
    {nome:'Entradas', ativo:true},
    {nome:'Pães', ativo:false}
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
db.produtos.find({}, {nome:1, preco:1, _id:0})