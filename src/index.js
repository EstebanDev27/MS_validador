import express from 'express';
import HubSpot from "./routes/HubspotRoutes.js"

const app = express();

app.use("/integrador",HubSpot);

const PORT = 3000;




app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`🔗 http://localhost:${PORT} xdxdxdxd`);
});