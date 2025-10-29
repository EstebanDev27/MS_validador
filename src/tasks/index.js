import { CloudTasksClient } from '@google-cloud/tasks';

// Instantiates a client.
const client = new CloudTasksClient();


const createHttpTask = async (payload , url) => {

  console.log("Payload recibido ",payload,url)

  try {
    const project = 'agente-piloto';
    const queue = 'dynamics-integration-queue';
    const location = 'us-east1';
  
    const inSeconds = 180;
    
    
    // Construct the fully qualified queue name.
    const parent = client.queuePath(project, location, queue);
    
    const task = {
      httpRequest: {
        headers: {
          'Content-Type': 'text/plain',
        },
        httpMethod: 'POST',
        url,
      },
    };
    
    if (payload) {
      task.httpRequest.body = Buffer.from(JSON.stringify(payload)).toString('base64');
    }
    
    if (inSeconds) {
      // The time when the task is scheduled to be attempted.
      task.scheduleTime = {
        seconds: parseInt(inSeconds) + Date.now() / 1000,
      };
    }
    
    // Send create task request.
    console.log('Sending task:');
    console.log(task);
    const request = {parent: parent, task: task};
    const [response] = await client.createTask(request);
    console.log(`Created task ${response.name}`);
    
  } catch (error) {
    console.log("Error al crear tarea ",error)
  }


}

export default createHttpTask;