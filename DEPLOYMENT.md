# Escape The Cloud

Escape The Cloud is a cloud-enabled, React powered web application responsible for hosting the CyberArk Cloud Escape Room CTF challenge.

### Deployment

Escape The Cloud requires [Node.js](https://nodejs.org/) v12+ to run.

Update your terminal's environment variables with your AWS programmatic user credentials:
````
export AWS_ACCESS_KEY_ID=AKIA*****************************
export AWS_SECRET_ACCESS_KEY=*****************************
````

Install the dependencies and devDependencies and start the server.

```sh
$ npm install -g @aws-amplify/cli
$ git clone https://github.com/cyberark/escape-the-cloud
$ cd escape-the-cloud
$ yarn
```

#### AWS Environment Initialization

- Initialize the AWS environment (Run once): `source ./headless_init_env.sh`

#### Cleanup

- Clean the AWS environment when your'e done (Run once): `./headless_clean_env.sh`
- Reset the repository: `git reset --hard && git clean -fd`

### Deployment with Docker

- Run `cp .env.example .env`
- Don't forget to update `.env` file with your AWS access & secret key!

#### Using docker run

It's easy to deploy Escape The Cloud using the attached Dockerfile!
- Build the image: `docker build -t me/escape-the-cloud .`
- Start the container: `docker run -dit -p 3000:3000 --env-file .env --name escape-the-cloud me/escape-the-cloud`

#### Using docker-compose

It's easy to deploy Escape The Cloud using the attached docker-compose file!
- If you're using different docker daemon then `/var/run/docker.sock` please update the `docker-compose.yml` file.
- Build the image locally and run the container: `docker-compose up -d`

#### AWS Environment Initialization

- Initialize the AWS environment (Run once): `docker exec escape-the-cloud sh /app/headless_init_env.sh`

#### Cleanup

- Clean the AWS environment when your'e done (Run once): `docker exec escape-the-cloud sh /app/headless_clean_env.sh`
- Stop the container: `docker stop escape-the-cloud`
- Remove the container: `docker rm escape-the-cloud`

### Deployment progress & UI

Don't forget to `docker logs escape-the-cloud` to see how the deployment progress is doing.

Visit `localhost:3000` on your computer to access the UI when you see `Failed to compile` on the logs (since no AWS environment is provisioned until you'll execute the `headless_init_env` file).

### Playing in the challenge

Ready to play? visit the [Playing](./PLAYING.md) page to start a jam!
