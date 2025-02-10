use('cinema')
db.filmes.insertOne({
  "titulo": "Guerra nas Estrelas 2",
  "ano": 1981,
  "diretor": "George Lucas",
  "classificação": "⭐⭐⭐"
})

use("cinema")
db.filmes.find()

use("cinema")
db.filmes.find({}, {titulo:1, ano:1, _id:0})

use("cinema")
db.filmes.find({ano: 1981}, {titulo:1, ano:1, _id:0})