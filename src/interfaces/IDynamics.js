const IDynamics = {
    
    firstname: { aliases: ['First Name', 'firstname'], required: true },
    
    middlename: { aliases: ['Last Name', 'middlename'], required: true }, 
    
    emailaddress1: { aliases: ['Email', 'emailaddress1'], required: true },
    mobilephone: { aliases: ['Mobile phone number', 'mobilephone'], required: true },
    rs_escuelaprocedenciaid: { aliases: ['Escuela de procedencia', 'rs_escuelaprocedenciaid'], required: true },
    rs_campusinteresid: { aliases: ['Campus', 'rs_campusinteresid'], required: true },
    rs_canalid: { aliases: ['Canal', 'rs_canalid'], required: true },
    rs_programainteresid: { aliases: ['Carrer', 'rs_programainteresid'], required: true },
    rs_categoriaid: { aliases: ['Modalidad', 'rs_categoriaid'], required: true },
    rs_nivelid: { aliases: ['Nivel_de_interes', 'rs_nivelid'], required: true },
    rs_ciclointeresid: { aliases: ['Ciclo de tu interés', 'rs_ciclointeresid'], required: true },
    rs_origenid: { aliases: ['Origen', 'rs_origenid'], required: true },
    
    rs_medioid: { aliases: ['Medio preferido de contacto', 'rs_medioid'], required: true }, 
    
    rs_creadorleadid: { aliases: ['Creador', 'rs_creadorleadid'], required: true },
    
    aa_embajador: { aliases: ['Embajador', 'aa_embajador'], required: false }, 
    
    telephone1: { aliases: ['Numero de tel adicional', 'telephone1'], required: true }, 
    
    
    aa_fhoraria: { aliases: ['Horarios de contacto', 'aa_fhoraria'], required: true }, 
    
    al_fechaprospectapp: { aliases: ['Hora de cita', 'al_fechaprospectapp'], required: true },
    
    rs_mediocontacto: { aliases: ['Medio preferido para contacto', 'rs_mediocontacto'], required: true }, 
    
    rs_marcaid: { aliases: ['Company Name', 'rs_marcaid'], required: true }
};

export default IDynamics;
