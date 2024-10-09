import swaggerJsDoc from 'swagger-jsdoc';
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'store swagger',
        version: '1.0.0',
        description: 'show all'
    },
    servers: [
        {
            url: 'http://localhost:5000'
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', '/server.js']
};
export const swaggerSpec = swaggerJsDoc(options);
