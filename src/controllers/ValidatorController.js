/**
 * Valida un request de HubSpot según un esquema flexible.
 * @param {Object} data - El objeto 'properties' recibido de HubSpot (req.body.properties)
 * @param {Object} schema - Esquema de validación
 * { campoInterno: { aliases: ['prop_hubspot_1', 'prop_hubspot_2'], required: true//false } }
 * @returns {Object} - { valid: boolean, missing: [] }
 */
export const validateRequest = async (data, schema) => {

    // Si no hay objeto 'properties', todos los campos requeridos faltarán.
    if (!data) {
        const requiredKeys = Object.keys(schema).filter(k => schema[k].required);
        return { valid: false, missing: requiredKeys };
    }

    const missing = [];

    try {
        for (const key in schema) {
            const { aliases, required } = schema[key];

            // 1. Encontrar cuál de los aliases existe en el objeto 'data'
            const foundAlias = aliases.find(alias => data.hasOwnProperty(alias));

            // 2. Si encontramos un alias, verificar su valor.
            let hasValue = false;
            if (foundAlias) {
                const property = data[foundAlias];

                if (property && 
                    property.hasOwnProperty('value') && 
                    property.value !== null && 
                    property.value !== undefined && 
                    property.value !== ''
                ) {
                    hasValue = true;
                }
            }

            // 3. Si era requerido y no tiene valor, se añade a la lista de faltantes.
            if (required && !hasValue) {
                missing.push(key); // Agregamos el nombre interno (ej. 'firstname')
            }
        }

        return {
            valid: missing.length === 0,
            missing
        };

    } catch (error) {
        console.log("Error al validar datos ", error);
        // Devolvemos un estado de error
        return { valid: false, missing: [], error: error.message }; 
    }
}
