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
        const municipios = JSON.parse(fs.readFileSync('municipios.json', 'utf8'));
        const result = await db.collection(collectionName).insertMany(municipios);
        console.log(`${result.insertedCount} municípios importados`);
    } catch (err) {
        console.error(`❌ Erro ao importar municípios: ${err}`);
    } finally {
        await client.close();
        console.log('🔒 Conexão fechada');
    }
}