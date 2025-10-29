import express from 'express';
import HubSpot from "./routes/HubspotRoutes.js";
import { connectToDB } from './database/index.js';


const app = express();
const PORT = 3000;

// --- Middlewares ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// --- Rutas ---
app.use("/integrador", HubSpot);

app.get('/', async (req, res) => {
  res.sendStatus(200);
});

// --- Función de arranque ---
async function startServer() {
  try {
    
    await connectToDB();

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}/integrador`);
    });

  } catch (err) {
    console.error("No se pudo iniciar el servidor:", err);
    process.exit(1);
  }
}

// 4. Llama a la función de arranque
startServer();