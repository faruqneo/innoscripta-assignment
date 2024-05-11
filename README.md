# Documentation:

## Ensure that Docker is installed on your system. You can download and install Docker Desktop from the official Docker website: https://www.docker.com/products/docker-desktop
## Pull the Docker Image:

Open a terminal or command prompt.
 Run the following command to pull the Docker image from Docker Hub:

<pre>
docker pull neofaruq/innoscripta-assignment
</pre>

### Run the Docker Container:

After pulling the image, you can run a container using the following command:
<pre>
docker run -p 3000:3000 neofaruq/innoscripta-assignment
</pre>
This command will start the Docker container and map port 3000 of the container to port 3000 on your local machine.
### Access Your React Application:

Once the container is running, you can access your React application in a web browser by navigating to `http://localhost:3000`.
### Stopping the Container:

To stop the running Docker container, you can press Ctrl + C in the terminal where it's running. This will stop the container gracefully.
Alternatively, you can run the following command in a new terminal window:
```
docker stop <container_id>
```
Replace <container_id> with the ID of the running container, which you can find by running docker ps.
