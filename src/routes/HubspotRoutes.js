import { Router } from "express";
import { validateRequest } from "../controllers/ValidatorController";
import IDynamics from "../interfaces/IDynamics";
import IHubspot from "../interfaces/IHubspot";
import IRequest from "../interfaces/IRequest";
import createHttpTask from "../tasks";

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

        if( type == "qr_integracion_hubspot"){
            isValid = validateRequest(req.body,IDynamics)
        }else if( type == 'qr_integracion_dynamics'){
            isValid = validateRequest(req.body,IHubspot)
        }else {
            isValid = validateRequest(req.body,IRequest)
        }

        if(isValid){
            const queue = createHttpTask(req.body)
        }else{
            /* Aqui voy a almacenar los logs en MongoDB */
        }



        



        /* Controller para tipo de consulta */

        
        console.log("Cuerpo de respuesta ",req);

        res.status(200).json({
            message:`Petición POST: ${type}`
        })
    } catch (error) {
        
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