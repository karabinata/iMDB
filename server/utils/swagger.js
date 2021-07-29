exports.swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'iMDB',
        version: '1.0.0',
        description: 'A simple movie database'
      },
      servers: [
        {
          url: 'http://localhost:4000'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{
        bearerAuth: []
      }]
    },
    apis: ['./routes/*.js']
}