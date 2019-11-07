# Escape The Cloud

Escape The Cloud is a cloud-enabled, React powered web application responsible for hosting the CyberArk Cloud Escape Room CTF challenge.

### Tech

Escape The Cloud uses a number of awesome open source projects to work properly:

* [React](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
* [React-Router](https://github.com/ReactTraining/react-router) - Declarative routing for React.
* [Materual-UI](https://github.com/mui-org/material-ui) - React components for faster and easier web development. Build your own design system, or start with Material Design.
* [AWS Amplify](https://github.com/aws-amplify/amplify-js) - A declarative JavaScript library for application development using cloud services.
* [React-Toastify](https://github.com/fkhadra/react-toastify) - React notification made easy
* [Redux](https://github.com/reduxjs/redux) - Predictable state container for JavaScript apps.
* [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Thunk middleware for Redux.
* [React Redux](https://github.com/reduxjs/react-redux) - Official React bindings for Redux
* [Prettier](https://github.com/prettier/prettier) - An opinionated code formatter.

### Getting Started

Welcome to Escape the Cloud!

In this challenge, you’ll get some hands on experience with AWS services related to both the usage and security features of each service. For each service, we will present you with a mission that you’ll need to solve.

Please read the following guidelines carefully in order to complete the tasks:
Every mission ends with a secret and a hint for the next mission. Please keep any information you find in a safe place, as you may need it on another missions as you progress through the challenge.

1. Every mission focuses on a single AWS service. While working on a specific service, you are not required to explore other services in the AWS console.
2. The challenge was built and designed for educational purposes. We’re encouraging you to explore the AWS services and try to unblock resources in order to access them and progress through the challenge.

### Running the challenge on your AWS account

Please read the following instructions carefully, since you won’t be able to start the challenge without properly configuring the account:

1. Please log in to your AWS account with an Administrator user.
2. Create two IAM policies:
   - BasicTeamRolePolicy - Copy the content from [BasicTeamRolePolicy.json](./BasicTeamRolePolicy.json), and replace ‘xxxxxxxxxxxx’ with your AWS account number.
   - RestrictTeamRolePolicy - Copy the content from [RestrictTeamRolePolicy.json](./RestrictTeamRolePolicy.json), and replace ‘xxxxxxxxxxxx’ with your AWS account number.
 3. Create an IAM Role named TeamRole and attach both policies to this role. After attaching the policies, go to Trust Relationships on TeamRole and copy the content from [TrustRelationshipsPolicy.json](./TrustRelationshipsPolicy.json).
 4. Create a new IAM user (I.E challengeuser ) with Console Access. While choosing permissions, choose the created IAM policies 
 5. Please log out and log in with the newly created user, using the username and password you chose during the user creation.
 6. Deploy the solution (with or without docker). On the website, go to the sign up screen and enter your username, email address, and password. Please use only lowercase characters (no numbers, no special characters, etc) while choosing your username. After the initial registration, an activation email should be sent to you. Click the confirmation link to get started.
 7. On the website, after you logged in to your environment and completed the onboarding process, the Play Snake button should be replaced with a Start button. If it didn’t, refresh the page. If it still not working, contact us or open an issue.

### Recommendations

For the sake of the challenge, you are authorized, but not allowed to create any resources. The CloudFormation stack will provision all the resources needed for the missions. We’ll mention a few resources you might think creating during the challenge:
- RDS replications.
- RDS snapshots.
- EC2 Instances.
- Amazon Machine Images (AMI).
- EBS volume snapshots.
- S3 bucket using cross-region replication.

This challenge and accounts were tailored to the training purposes, please do not use your  AWS account permissions to abuse the system.

### Installation

Escape The Cloud requires [Node.js](https://nodejs.org/) v12+ to run.

Update your terminal's environment variables with your AWS programmatic user credentials:
````
AWS_ACCESS_KEY_ID=AKIA*****************************
AWS_SECRET_ACCESS_KEY=*****************************
````

Install the dependencies and devDependencies and start the server.

```sh
$ npm install -g @aws-amplify/cli
$ git clone https://github.com/cyberark/escape-the-cloud
$ cd escape-the-cloud
$ yarn
$ ./headless_init_env.sh
```

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

- Initialize the AWS environment (Run once): `docker exec escape-the-cloud /app/headless_init_env.sh`

#### Cleanup

- Clean the AWS environment when your'e done (Run once): `docker exec escape-the-cloud sh /app/headless_clean_env.sh`
- Stop the container: `docker stop escape-the-cloud`
- Remove the container: `docker rm escape-the-cloud`

### Deployment progress & UI

Don't forget to `docker logs escape-the-cloud` to see how the deployment progress is doing.

Visit `localhost:3000` on your computer to access the UI when you see `Failed to compile` on the logs (since no AWS environment is provisioned until you'll execute the `headless_init_env` file).

### Todos

 - You tell me?

## License

Copyright © 2019 CyberArk Software Ltd. All rights reserved.

We distribute Escape the Cloud under the following [License](./LICENSE)

Escape the Cloud also uses some third-party components and images which are licensed under their own respective licenses. The list of these licenses is summarized in [Open Source License Acknowledgements and Third-Party Copyrights](./NOTICE.md).
