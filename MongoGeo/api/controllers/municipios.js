import { ObjectId } from 'mongodb';

export const getMunicipiosById = async (req, res) => {
    try {
        const { id } = req.params;
        const db = req.app.locals.db;
        const municipio = await db.collection('municipios').findOne({ _id: ObjectId.createFromHexString(id) });
        if (!municipio) {
            return res.status(404).json({ error: true, message: 'Municipio not found' });
        }
        res.status(200).json(municipio);
    }
    catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error' });
        console.error('Error getting municipio by id', error);
    }
}

export const createMunicipio = async (req, res) => {
    try {
        const { codigo_ibge, nome, capital, codigo_uf, local } = req.body;
        const db = req.app.locals.db;
        if (!codigo_ibge || !nome || !codigo_uf) {
            return res.status(400).json({ error: true, message: 'Missing required fields' });
        }
        const existeMunicipio = await db.collection('municipios').findOne({ codigo_ibge })
        if (existeMunicipio) {
            return res.status(409).json({ error: true, message: 'Municipio already exists with this IBGE code' });
        }
        const novoMunicipio = { codigo_ibge, nome, capital, codigo_uf, local }

        const result = db.collection("municipios").insertOne(novoMunicipio)
        res.status(201).json({ id: result.insertedId, ...novoMunicipio });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error' });
        console.error('Error creating municipio', error);
    }
}
