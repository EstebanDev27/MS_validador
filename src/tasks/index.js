// createHttpTask.js
import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';

/* Función para enviar data al siguiente micro pipipipi */
const createHttpTask = async (payload, url) => {
  try {
    const project = 'agente-piloto';
    const queue = 'dynamics-integration-queue';
    const location = 'us-east1';

    // Si quieres programarla al futuro, ajusta este valor (segundos). 0 = inmediata.
    const inSeconds = 180;

    // Endpoint REST (igual que en el curl)
    const endpoint = `https://cloudtasks.googleapis.com/v2/projects/${project}/locations/${location}/queues/${queue}/tasks`;

    // Cuerpo en base64 (Cloud Tasks pide body string base64)
    const bodyB64 = payload
      ? Buffer.from(JSON.stringify(payload)).toString('base64')
      : undefined;

    // Task equivalente al curl (nota: camelCase en oidcToken, httpMethod, etc.)
    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(bodyB64 ? { body: bodyB64 } : {}),
        oidcToken: {
          serviceAccountEmail: 'cloud-tasks-gsa@agente-piloto.iam.gserviceaccount.com',
          // audience: url, // descomenta si tu endpoint valida 'aud'
        },
      },
    };

    // Programación futura (opcional), igual que hacías antes
    if (inSeconds && Number(inSeconds) > 0) {
      task.scheduleTime = {
        seconds: Math.floor(Date.now() / 1000) + Number(inSeconds),
      };
    }

    // OAuth 2.0: obtiene un access token (equivale a `gcloud auth print-access-token`)
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Petición axios -> Cloud Tasks REST
    const { data } = await axios.post(
      endpoint,
      { task }, // exactamente como en el curl
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      }
    );

    console.log('Created task', data?.name);
    return data;
  } catch (error) {
    // Log útil para depurar respuesta de la API
    if (error.response) {
      console.error('Cloud Tasks error:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error('Error al crear tarea:', error.message || error);
    }
    throw error;
  }
};

export default createHttpTask;
