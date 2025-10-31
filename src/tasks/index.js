// createHttpTask.js
import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';

/* Función para enviar data al siguiente micro pipipipi */
const createHttpTask = async (payload, url) => {
  try {
    const project = 'agente-piloto';
    const queue = 'dynamics-integration-queue';
    const location = 'us-east1';

    const inSeconds = 180;

    const endpoint = `https://cloudtasks.googleapis.com/v2/projects/${project}/locations/${location}/queues/${queue}/tasks`;

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
        },
      },
    };



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
          Authorization: `Bearer ${gcloud auth print-access-token }`,
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
