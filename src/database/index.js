import { MongoClient } from "mongodb";

const DB_NAME = 'save-logs'; 
const MONGO_URI = `mongodb://madmin:DonKara-{0127}@mongo-save-logs:27017/save-logs?authSource=admin`;

const client = new MongoClient(MONGO_URI);

let db;

/**
 * Se conecta a la base de datos.
 * Se debe llamar una vez al iniciar la aplicación.
 **/

export async function connectToDB() {
  try {
    await client.connect();

    db = client.db(DB_NAME);

    console.log(`¡Conectado exitosamente a MongoDB!`);

  } catch (err) {
    console.error('ERROR AL CONECTAR A MONGODB:', err);
  }
}

/**
 * Devuelve la instancia de la base de datos ya conectada.
 * Los otros archivos usarán esta función.
 */
export function getDb() {
  if (!db) {
    throw new Error('¡La base de datos no está inicializada! Llama a connectToDB() primero.');
  }
  return db;
}