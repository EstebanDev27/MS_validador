import { getDb } from "../database/index.js";

const SaveLog =  async (log) => {
    console.log("Log a guardar ",{message:"Data almacenada desde local :D ",status:200,timestamp: new Date()});
    try {
        const db = getDb();

        const resultado = await db.collection('logs').insertOne({message:"Data almacenada desde local :D ",status:200,timestamp: new Date().toISOString().replace('T'," ")});
        
        return resultado;

    } catch (error) {
        console.error("Error al guardar el log:", error);
    }
}

export default SaveLog;