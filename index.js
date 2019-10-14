'use strict';

const Hapi = require('@hapi/hapi');

let Content = require('./service/Content') ;
let contentObj = new Content() ;


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });


    let handlers = {
        post: function (request, reply) {

            console.log('post content: '+ JSON.stringify(request.payload));

            let content = {
                title: request.payload.title,
                body: request.payload.body,
            };

            return contentObj.saveContent(content);
        },

        getAll: function (request, reply) {

            return contentObj.content().findAll().then(rows => {
                console.log(rows) ;
                return JSON.stringify(rows);
            });
        },
    };

    server.route([
        { path: '/',method: 'POST',handler: handlers.post },
        { path: '/',method: 'GET', handler: handlers.getAll },
    ]);


    await server.start();
    console.log('Server running on %s', server.info.uri);


};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();