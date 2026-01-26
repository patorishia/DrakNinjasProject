import { OpenAPIV3 } from "openapi-types";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "DrakNinjas Anime News API",
    version: "1.0.0",
    description: "API documentation for the Anime News platform",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  paths: {
    "/api/news": {
      get: {
        summary: "Get all news",
        responses: {
          200: {
            description: "List of news articles",
            content: {
              "application/json": {
                schema: { type: "array", items: { type: "object" } },
              },
            },
          },
        },
      },
    },

    "/api/news/{slug}": {
      get: {
        summary: "Get news by slug",
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "News article",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
    },

    "/api/news-by-id/{id}": {
      get: {
        summary: "Get news by ID (admin)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "News article",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
    },

    "/api/news-fetch": {
      get: {
        summary: "Fetch and scrape ANN news",
        responses: {
          200: {
            description: "Scraping completed",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
    },
  },
  components: {},
};
