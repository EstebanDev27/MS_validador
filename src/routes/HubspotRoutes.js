import { Router } from "express";
import { validateRequest } from "../controllers/ValidatorController.js";
import SaveLog from "../controllers/LogsController.js";
import IDynamics from "../interfaces/IDynamics.js";
import IHubspot from "../interfaces/IHubspot.js";
import IRequest from "../interfaces/IRequest.js";
import createHttpTask from "../tasks/index.js";

const router = Router();

router.post('/:type', async (req, res ) => {
    var isValid = false;
    
    try {
        
        const { type } = req.params;

        /* Guardar propiedades que manda hubspot */
        await SaveLog(req.body.properties);

        /* Switch para validación de propiedades por caso */
        switch (type) {
            case "qr_integracion_hubspot":
                isValid = await validateRequest(req.body.properties,IHubspot);
                break;
            case "qr_integracion_dynamics":
                isValid = await validateRequest(req.body.properties,IDynamics);
                break;
            default:
                isValid = await validateRequest(req.body.properties,IRequest);
                break;
        }
        
        await createHttpTask(req.body,`https://comunicacionesaliat.com/integrador/contact-sync-filter`);

        /* if(!isValid.valid){
            return res.status(400).json({
                message:`Petición POST: ${type}`,
                resultado:`datos_incompletos ${isValid.missing}`,
                estatus_integracion_dynamics:"datos_incompletos"
            })
        }else{
            await createHttpTask(req.body,`https://comunicacionesaliat.com/integrador/contact-sync-filter`);
            return res.sendStatus(202).json({
                message:"Datos validados correctamente"
            })
        } */

        /* Pruebas */

        return res.status(202).json({
                message:"Datos validados correctamente"
        })


    } catch (error) {
        console.log("Error al valdiar datos en ruta /integrador/:type ")
        res.status(500).json({
            message:`Error al validar datos ${error}`
        })
    }
})

router.post('/contact-sync-filter', async (req , res) => {
    res.status(200).json({
        message:"POST"
    })
})

router.get('/contact-sync-filter', async (req , res) => {
    res.status(200).json({
        message:"GET"
    })
})



export default router;