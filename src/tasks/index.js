// createHttpTask.js
import axios from 'axios';

/* Función para enviar data al siguiente micro pipipipi */
const createHttpTask = async (payload, url) => {
  try {
    const project = 'agente-piloto';
    const queue = 'dynamics-integration-queue';
    const location = 'us-east1';
    
    const endpoint = `https://cloudtasks.googleapis.com/v2/projects/${project}/locations/${location}/queues/${queue}/tasks`;

    const bodyB64 = Buffer.from(JSON.stringify(payload)).toString('base64')

    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyB64,
        oidcToken: {
          serviceAccountEmail: 'cloud-tasks-gsa@agente-piloto.iam.gserviceaccount.com',
        },
      },
    };


    const { data } = await axios.post(
      endpoint,
      { task },
      {
        headers: {
          Authorization: `Bearer ya29.a0ATi6K2uyEDWckWFC30qRr9ah73R5t1P_LKnOi2p0Yw5hhoRy_xTtDYhlrYMSwJjAcEaDC-rLeZ9kmAmWPJDJ1VF0WYXNDSG6u1ZW7Ma4W1Nr7W_Tj_wonW3eW7oZrdgf_8jhrqHSUTsHY97ajkNZqf6RRZEfjLTET1zFY8qGORUiYTfXt330BEJRMducMNSpWu1d7rVxce2V4gaCgYKAbMSARQSFQHGX2Mit5XCK7qo-hYPSuoInuRuxw0213`,
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
