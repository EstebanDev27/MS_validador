import express from 'express';
import HubSpot from "./routes/HubspotRoutes.js"

const app = express();


app.get('/', async (req , res ) => {
  res.sendStatus(200)
});

app.use("/integrador",HubSpot);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`https://comunicacionesaliat.com/integrador/`);
});