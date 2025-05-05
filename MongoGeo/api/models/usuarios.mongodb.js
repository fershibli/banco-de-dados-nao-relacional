use('test')
db.usuarios.insertOne({
    'nome': 'Maria José',
    'email': 'mariajose@uol.com.br',
    'senha': '123mudar',
    'ativo': true,
    'tipo': 'Cliente', // ou 'Admin'
    'avatar': 'https://ui-avatars.com/api/?name=Maria+Jose&background=0D8ABC&color=fff',
})

db.usuarios.createIndex({ 'email': 1 }, { unique: true })

db.usuarios.find({}, { senha: 0 })