use('estoque')
db.municipios.find().count() // 5570

use('estoque')
db.municipios.find().limit(5)

use('estoque')
db.municipios.find({ codigo_uf: 52 })

use('estoque')
db.municipios.aggregate([
    {
        $lookup: {
            from: 'estados',
            localField: 'codigo_uf',
            foreignField: 'codigo_uf',
            as: 'estado'
        }
    }
])

use('estoque')
db.estados.aggregate([
    {
        $lookup: {
            from: 'municipios',
            localField: 'codigo_uf',
            foreignField: 'codigo_uf',
            as: 'municipios'
        }
    }
])