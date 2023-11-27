const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Auction API',
        version: '1.0.0',
        description: 'Auction API',
        contact: {
        name: 'Auction API',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/api/*.js'],
    
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;