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

### Installation

Escape The Cloud requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install -g @aws-amplify/cli
$ git clone https://github.com/avishayil/escape-the-cloud
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
- Run the container: `docker run -dit -p 3000:3000 --env-file .env --name escape-the-cloud me/escape-the-cloud`

#### Using docker-compose

It's easy to deploy Escape The Cloud using the attached docker-compose file!
- Build the image locally and run the container: `docker-compose up -d`

### Deployment progress & UI

Don't forget to `docker logs escape-the-cloud` to see how the deployment progress is doing.

Visit `localhost:3000` on your computer to access the UI when you see `Compiled` on the logs.

### Development

Want to contribute? Great!
Make a change in the files on the `src` folder, and instantanously see your updates!

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

### Todos

 - Automatic environment deployment

## License

Copyright © 2019 CyberArk Software Ltd. All rights reserved.

We distribute Escape the Cloud under the following [License](./LICENSE.md)

Escape the Cloud also uses some third-party components and images which are licensed under their own respective licenses. The list of these licenses is summarized in [Open Source License Acknowledgements and Third-Party Copyrights](./NOTICE.md).
