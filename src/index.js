import express from 'express';

const app = express();
const PORT = 3000;


app.get('/', async (req, res) => {

  try {

    res.status(200).json({
        message:"Ya estás conectado :D "
    })

  } catch (error) {

    console.error('❌ Error en la ruta /:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });

  } finally {
    
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`🔗 http://localhost:${PORT} SI FUNCIONAAAA xdxxdxdxd`);
});