// config/swagger.js
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Base de Datos API',
    version: '1.0.0',
    description: 'API, documentacion para proyecto DB'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '../docs/index.ts'),
    path.join(__dirname, '../docs/db.yaml')
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
 