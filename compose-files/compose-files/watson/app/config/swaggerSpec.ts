import swaggerJsdoc from "swagger-jsdoc";

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Watson",
      description:
        "Watson is an acronym for Wallet and Token Service on Node. It is the service for operating on the blockchain and indexing the results and off chain data that we need to operate. To use the Basic Auth locally, use the text: ZGphbmdvOnNlY3JldDE=",
      version: "0.0.2",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "basic",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./app/routers/rpcRouter.ts"], // files containing annotations as above
};

export const swaggerSetupOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

export const openapiSpecification = swaggerJsdoc(options);
