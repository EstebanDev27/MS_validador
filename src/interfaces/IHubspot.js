const IHubspot = {
    programa_de_interes: { aliases: ['Carrer', 'programa_de_interes'], required: true },
    origen: { aliases: ['Origen', 'leadsource'], required: true },
    nivel_de_interes: { aliases: ['Nivel_de_interes', 'nivel_de_interes'], required: true },
    medio_preferido_de_contacto: { aliases: ['Medio preferido para contacto', 'medio_preferido_de_contacto'], required: true },
    companyname: { aliases: ['Company Name', 'company'], required: true },
    escuela_de_procedencia: { aliases: ['Escuela de procedencia', 'escuela_prod_32'], required: true },
    creador: { aliases: ['Creador', 'email_propietario'], required: true },
    ciclo_de_tu_interes: { aliases: ['Ciclo de tu interés', 'ciclo_de_tu_interes'], required: true },
    modalidad: { aliases: ['Modalidad', 'modalidad_c'], required: true },
    canal: { aliases: ['Canal', 'canal_c'], required: true },
    campus: { aliases: ['Campus', 'campus__c'], required: true },
    mobilephone: { aliases: ['Mobile phone number', 'telefono_movil'], required: true },
    lastname: { aliases: ['Last Name', 'apellido'], required: true },
    firstname: { aliases: ['First Name', 'nombre'], required: true },
    email: { aliases: ['Email', 'correo'], required: true },
    id_lead_qr: { aliases: ['id 32 digitos QR', 'id_lead_qr'], required: false },
    telefono_adicional: { aliases: ['Numero de tel adicional', 'telefono_adicional'], required: false },
    horario_de_cita: { aliases: ['Hora de cita', 'horario_de_cita'], required: false },
    horarios_de_contacto: { aliases: ['Horarios de contacto', 'horarios_de_contacto'], required: false },
    embajador: { aliases: ['Embajador', 'embajador'], required: false }
};

export default IHubspot;