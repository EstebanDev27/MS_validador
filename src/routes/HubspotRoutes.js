import { Router } from "express";
import { validateRequest } from "../controllers/ValidatorController.js";
import IDynamics from "../interfaces/IDynamics.js";
import IHubspot from "../interfaces/IHubspot.js";
import IRequest from "../interfaces/IRequest.js";

const router = Router();


router.get('/', async (req, res) => {

  try {
        console.log("Consultaste bien la api :D! este es el mismo pod")

        res.json({
            message:"Api funcionando xd"
        })  

  } catch (error) {

    res.status(500).json({ error: 'Error interno del servidor.' });

  } 
});

router.get('/:type', async (req, res) => {

  try {
        const { type } = req.params;

        console.log("Tipo de consulta a hacer ",type)

        res.sendStatus(200).json({
            message:"Api funcionando xd"
        })  

  } catch (error) {

    res.status(500).json({ error: 'Error interno del servidor.' });

  } 
});


router.post('/:type', async (req, res ) => {
    var isValid = false;
    
    try {
        
        const { type } = req.params;

        /* console.log("Param obtenido ",type); */
        console.log("Request obtendio ",req.body)

        /* Switch para validación de caso */
        switch (type) {
            case "qr_integracion_hubspot":
                isValid = await validateRequest(req.body,IHubspot)
                break;
            case "qr_integracion_dynamics":
                isValid = await validateRequest(req.body,IDynamics);
                break;
            default:
                isValid = await validateRequest(req.body,IRequest);
                break;
        }

        console.log("Es valido ",isValid)

        res.status(200).json({
            message:`Petición POST: ${type}`
        })
    } catch (error) {
        console.log("Error al valdiar datos en ruta /integrador/:type ")
        res.status(500).json({
            message:`Error al validar datos ${error}`
        })
    }
})

router.put('/', async (req, res ) => {
    try {
        console.log("Cuerpo de respuesta ",req.body);
        res.status(200).json({
            message:"PUT a petición /hubspot/"
        })
    } catch (error) {
        
    }
})

router.delete('/', async (req, res ) => {
    try {
        console.log("Cuerpo de respuesta ",req.body);
        res.status(200).json({
            message:"DELETE a petición /hubspot/"
        })
    } catch (error) {
        
    }
})


export default router;