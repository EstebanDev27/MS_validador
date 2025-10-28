import express from 'express';
import HubSpot from "./routes/HubspotRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); 


app.use("/integrador", HubSpot);

app.get('/', async (req, res) => {
  res.sendStatus(200);
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/integrador`);
});
