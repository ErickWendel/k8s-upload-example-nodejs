"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("hapi");
const Joi = require("joi");
const Fs = require("fs");
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const server = new Hapi.Server();
const port = process.env.PORT || 3000;
server.connection({ port });
(async () => {
    await server.register([
        Inert,
        Vision,
        {
            register: HapiSwagger,
            options: {
                info: {
                    title: 'Node.js upload file example - Erick Wendel',
                    version: '1.0',
                },
            },
        },
    ]);
    server.route([
        {
            method: 'POST',
            path: '/',
            config: {
                tags: ['api'],
                description: 'Upload a file',
                validate: {
                    payload: {
                        file: Joi.any()
                            .meta({ swaggerType: 'file' })
                            .description('file')
                            .required(),
                    },
                },
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form',
                    },
                },
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data',
                },
                handler: function (request, reply) {
                    const fileRequest = request.payload.file;
                    var name = fileRequest.hapi.filename;
                    var path = __dirname + '/uploads/' + name;
                    var file = Fs.createWriteStream(path);
                    file.on('error', function (err) {
                        console.error(err);
                        return reply('error on upload!' + err);
                    });
                    fileRequest.pipe(file);
                    fileRequest.on('end', function (err) {
                        var ret = {
                            filename: fileRequest.hapi.filename,
                            headers: fileRequest.hapi.headers,
                        };
                        return reply(JSON.stringify(ret));
                    });
                },
            },
        },
    ]);
    await server.start();
    console.log('server running at', server.info.port);
})();
