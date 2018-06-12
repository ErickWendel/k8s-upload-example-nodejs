## Node.js with Upload files Example

![Swagger Page of that application listing routes](https://i.imgur.com/2YGnZCm.png "Swagger Page of that application")

### Requirements

- Node.js v8+ or Docker and Docker Compose

### Running on localMachine

- Install dependencies - `sudo npm i -g typescript pm2 && npm i`
- Build typescript - `npm run build`
- Run project - `npm start`

### OR: Alternatives on pulling from Docker hub

- Docker hub image: [erickwendel/k8s-upload-example-nodejs](https://hub.docker.com/r/erickwendel/k8s-upload-example-nodejs)

```shell
docker run -p 3000:3000 \
    -v uploads:/src/uploads \
    erickwendel/k8s-upload-example-nodejs
    
```

### Viewing

- Go to swagger page - `localhost:3000/documentation`
