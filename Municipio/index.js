const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://localhost:27017';
const dbName = 'estoque';
const collectionName = 'municipios';

async function importaMunicipios() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('✅ Conectado ao MongoDB');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const findCollection = await db.listCollections({ name: collectionName }).toArray();
        if (findCollection.length > 0) {
            await collection.drop();
            console.log(`🗑️ Coleção anterior ${collectionName} apagada`);
        }
        const municipios = JSON.parse(fs.readFileSync('municipios.json', 'utf8'));
        if (!Array.isArray(municipios)) {
            throw new Error('Arquivo inválido');
        }
        const result = await collection.insertMany(municipios);
        console.log(`✅ ${result.insertedCount} municípios importados`);
    } catch (err) {
        console.error(`❌ Erro ao importar municípios: ${err}`);
    } finally {
        await client.close();
        console.log('🔒 Conexão fechada');
    }
}

importaMunicipios();