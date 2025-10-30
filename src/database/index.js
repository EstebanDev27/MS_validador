import { MongoClient } from "mongodb";

const DB_NAME = process.env.DB_NAME; 
const MONGO_URI = process.env.MONGO_URI;

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