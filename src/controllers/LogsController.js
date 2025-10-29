import { getDb } from "../database/index.js";

const SaveLog =  async (log) => {
    console.log("Log a guardar ",log);
    try {
        const db = getDb();

        const resultado = await db.collection('logs').insertOne(log);
        
        return resultado;

    } catch (error) {
        console.error("Error al guardar el log:", error);
    }
}

export default SaveLog;