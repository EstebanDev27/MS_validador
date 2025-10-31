import { Router } from "express";
import { validateRequest } from "../controllers/ValidatorController.js";
import SaveLog from "../controllers/LogsController.js";
import IDynamics from "../interfaces/IDynamics.js";
import IHubspot from "../interfaces/IHubspot.js";
import IRequest from "../interfaces/IRequest.js";
import createHttpTask from "../tasks/index.js";

const router = Router();

/* Primer ruta. 
    Valida el payload de las peticiones que llegan de HubSpot y en dado caso, retorna propiedades faltantes
    Almacena logs en base mongo
*/
router.post('/:type', async (req, res ) => {

    const commonURL = "https://comunicacionesaliat.com/integrador/";
    var isValid = false;
    
    try {
        
        const { type } = req.params;

        /* Guardar propiedades que manda hubspot */
        await SaveLog(req.body.properties);

        /* Switch para validación de propiedades por caso */
        switch (type) {
            case "web":
                break;
            case "qr_integracion_hubspot":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "qr_integracion_dynamics":
                isValid = await validateRequest(req.body.properties,IDynamics);
                break;
            case "qr_integracion_opp_dynamics":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "partner":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "partnerv2":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "academic_partnerv2":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "academic":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "academic_partner":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "opportunity":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "opportunity_partner":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            default:
                isValid = await validateRequest(req.body.properties,IRequest);
                break;
        }

        /* if(!isValid.valid){
            return res.status(400).json({
                message:`Petición POST: ${type}`,
                resultado:`datos_incompletos ${isValid.missing}`,
                estatus_integracion_dynamics:"datos_incompletos"
            })
        }else{
            await createHttpTask(req.body.properties,`${commonURL}contact-sync-filter`);
            return res.sendStatus(202).json({
                message:"Datos validados correctamente"
            })
        } */

        /* Pruebas */

        
        await createHttpTask(req.body.properties,`${commonURL}contact-sync-filter`);
        return res.status(202).json({
                message:"Datos validados correctamente"
        })


    } catch (error) {
        console.log("Error al valdiar datos en ruta /integrador/:type ",error)
        res.status(500).json({
            message:`Error al validar datos ${error}`
        })
    }
})

router.post('/contact-sync-filter', async (req , res) => {

    console.log("Task obtenido xxdxdxd",req.body);

    return res.sendStatus(200).json({
        message:"POST"
    })
})

router.get('/contact-sync-filter', async (req , res) => {
    res.status(200).json({
        message:"GET"
    })
})



export default router;