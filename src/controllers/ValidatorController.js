
/**
 * Valida un request según un esquema flexible
 * @param {Object} data - El objeto recibido de la API
 * @param {Object} schema - Esquema de validación
 *                          { campoInterno: { aliases: ['Nombre', 'primer_nombre'], required: true//false } }
 * @returns {Object} - { valid: boolean, missing: [] }
 */

export const validateRequest = async( data, schema ) => {

    if (!data) return false;

    const missing = [];

    try {
        for (const key in schema) {
            const { aliases, required } = schema[key];
    
            // Verifica si alguna de las aliases está presente en data
            const hasField = aliases.some(alias => data.hasOwnProperty(alias));
    
            if (required && !hasField) {
                missing.push(key);
            }
        }
    
        return {
            valid: missing.length === 0,
            missing
        };

    } catch (error) {
        console.log("Error al validar datos ",error)
    }

}




