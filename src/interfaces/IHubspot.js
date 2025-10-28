const IHubspot = {
    // Columna 'propiedad_hubspot' es la clave
    // 'required' se basa en 'requerido_hubspot'
    // 'aliases' incluye la 'etiqueta' y la clave misma

    firstname: { aliases: ['First Name', 'firstname'], required: true },
    lastname: { aliases: ['Last Name', 'lastname'], required: true },
    email: { aliases: ['Email', 'email'], required: true },
    mobilephone: { aliases: ['Mobile phone number', 'mobilephone'], required: true },
    escuela_prod_32: { aliases: ['Escuela de procedencia', 'escuela_prod_32'], required: true },
    campus__c: { aliases: ['Campus', 'campus__c'], required: true },
    canal_c: { aliases: ['Canal', 'canal_c'], required: true },
    programa_de_interes: { aliases: ['Carrer', 'programa_de_interes'], required: true },
    modalidad_c: { aliases: ['Modalidad', 'modalidad_c'], required: true },
    nivel_de_interes: { aliases: ['Nivel_de_interes', 'nivel_de_interes'], required: true },
    ciclo_de_tu_interes: { aliases: ['Ciclo de tu interés', 'ciclo_de_tu_interes'], required: true },
    leadsource: { aliases: ['Origen', 'leadsource'], required: true },
    
    // Asumo que 'Medio preferido de co...' es 'Medio preferido de contacto'
    medio_c: { aliases: ['Medio preferido de contacto', 'medio_c'], required: true }, 
    
    // Asumo que 'email_propietario...' es 'email_propietario_c'
    email_propietario_c: { aliases: ['Creador', 'email_propietario_c'], required: true }, 
    
    aa_embajador: { aliases: ['Embajador', 'aa_embajador'], required: false },
    
    // NOTA: La imagen marca 'telefono_adicional' como requerido (1)
    telefono_adicional: { aliases: ['Numero de tel adicional', 'telefono_adicional'], required: true }, 
    
    id_lead_qr: { aliases: ['id 32 digitos QR', 'id_lead_qr'], required: false },
    
    // Asumo que 'horarios_de_cont...' es 'horarios_de_contacto_c'
    // NOTA: La imagen lo marca como requerido (1)
    horarios_de_contacto_c: { aliases: ['Horarios de contacto', 'horarios_de_contacto_c'], required: true }, 
    
    horario_de_cita: { aliases: ['Hora de cita', 'horario_de_cita'], required: false },
    
    // Asumo que 'medio_preferido...' es 'medio_preferido_de_contacto'
    medio_preferido_de_contacto: { aliases: ['Medio preferido para contacto', 'medio_preferido_de_contacto'], required: true },
    
    // NOTA: La propiedad de HubSpot en la imagen es 'company', no 'companyname'
    company: { aliases: ['Company Name', 'company'], required: true } 
};

export default IHubspot;