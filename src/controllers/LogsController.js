import { getDb } from "../database/index.js";

/**
 * Valida un request de HubSpot según un esquema flexible.
 * @param {Object} log - El objeto 'properties' recibido de HubSpot (req.body.properties)
*/

/* Función para almacenar logs en mongo */
const SaveLog =  async (log) => {
    try {
        const db = getDb();

        await db.collection('logs').insertOne({log,timestamp: new Date().toISOString().replace('T'," ")});
        
        return;

    } catch (error) {
        console.error("Error al guardar el log:", error);
    }
}

export default SaveLog;