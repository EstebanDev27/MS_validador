import { CloudTasksClient } from '@google-cloud/tasks';

const client = new CloudTasksClient();

/**
 * Crea una tarea HTTP en Cloud Tasks, equivalente al curl que usaste.
 * @param {object} payload - Objeto JSON que se enviará al endpoint (se codifica en base64).
 * @param {string} url - URL del microservicio que procesará la tarea.
 * @param {object} opts - Opcional: configuración.
 * @param {string} [opts.project='agente-piloto']
 * @param {string} [opts.queue='dynamics-integration-queue']
 * @param {string} [opts.location='us-east1']
 * @param {string} [opts.serviceAccountEmail='cloud-tasks-gsa@agente-piloto.iam.gserviceaccount.com']
 * @param {number} [opts.delaySeconds=0] - Segundos en el futuro para programar la ejecución.
 * @param {string} [opts.audience] - Si tu endpoint valida aud, pon aquí la misma URL o un aud esperado.
 * @param {Record<string,string>} [opts.extraHeaders] - Headers adicionales (p.ej. {'x-process-key':'clave123'}).
 */
const createHttpTask = async (
  payload,
  url,
  opts = {}
) => {
  const {
    project = 'agente-piloto',
    queue = 'dynamics-integration-queue',
    location = 'us-east1',
    serviceAccountEmail = 'cloud-tasks-gsa@agente-piloto.iam.gserviceaccount.com',
    delaySeconds = 0,
    audience, // opcional
  } = opts;

  try {
    // Nombre completo de la cola
    const parent = client.queuePath(project, location, queue);

    // Headers como en el curl (application/json) + extras si aplican
    const headers = {
      'Content-Type': 'application/json',
    };

    // Cuerpo en base64 (Cloud Tasks espera string base64)
    const bodyB64 = payload
      ? Buffer.from(JSON.stringify(payload)).toString('base64')
      : undefined;

    // Estructura equivalente al curl (nota: camelCase en oidcToken)
    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        headers,
        ...(bodyB64 ? { body: bodyB64 } : {}),
        oidcToken: {
          serviceAccountEmail,
          ...(audience ? { audience } : {}),
        },
      },
    };

    // Programación en el futuro (opcional)
    if (delaySeconds && delaySeconds > 0) {
      task.scheduleTime = {
        seconds: Math.floor(Date.now() / 1000) + Number(delaySeconds),
      };
    }

    console.log('Sending task:', JSON.stringify(task, null, 2));

    const [response] = await client.createTask({ parent, task });
    console.log(`Created task ${response.name}`);
    return response;
  } catch (error) {
    console.error('Error al crear tarea', error);
    throw error;
  }
};

export default createHttpTask;
