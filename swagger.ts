export const swaggerDocument = {
    swagger: "2.0",
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My Express API',
    },
    host: 'localhost:3000',
    basePath: '/',
    tags: [
      {
        name: 'users',
        description: 'User related operations',
      },
      // other tags
    ],
    paths: {
      '/users': {
        get: {
          tags: ['users'],
          description: 'Get users',
          // other route details
        },
        // other methods
      },
      // other paths
    },
    // definitions, security, etc.
  };
  