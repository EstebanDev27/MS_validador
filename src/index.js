import express from 'express';
// 1. Importas el pool. Ahora tienes acceso a la BD desde esta variable.
import HubSpot from "./routes/HubspotRoutes.js"

const app = express();

app.use("/hubspot",HubSpot);

const PORT = 3000;



app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});