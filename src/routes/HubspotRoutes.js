import { Router } from "express";

const router = Router()

router.get('/', async (req, res) => {

  try {
        console.log("Consultaste bien la api :D! este es el mismo pod xdxddx")

        res.json({
            message:"Api funcionando xd"
        })  

  } catch (error) {

    res.status(500).json({ error: 'Error interno del servidor.' });

  } 
});

router.post('/', async (req, res ) => {
    try {
        console.log("Cuerpo de respuesta ",req.body);
        res.status(200).json({
            message:"POST a petición /hubspot/"
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