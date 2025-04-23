// For the sake of this example, we will use the same file for both development and production.
// In a real-world scenario, you would likely have separate files for each environment.
// This is a simple Express server with Swagger documentation and basic security features.
// It includes rate limiting, compression, and security headers.
// It also includes routes for the main API and user-related functionality.

// This if for Development only
// import helmet from "helmet";
// import express from "express";
// import cors from "cors";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// import mainRoutes from "./main.routes";
// import userRoutes from "./user.routes";
// import rateLimit from "express-rate-limit";
// import compression from "compression";

// const app = express();
// const PORT = 4000;

// app.use(compression());

 // Apply the rate limiting middleware to API calls only
// app.use(limiter);
// app.use(express.json());
// app.use(helmet());
// app.use(cors());

// Swagger definition
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Stuff API",
//       version: "1.0.0",
//       description: "API documentation for Stuff API",
//     },
//     servers: [
//       {
//         url: "https://stuff-api.vercel.app/v1",
//         description: "Production server",
//       },
//       {
//         url: `http://localhost:${PORT}/v1`,
//         description: "Development server",
//       },
//     ],
//   },
//   apis: ["./src/*.routes.js", "./src/controllers/*.js"],
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.get("/api-docs", (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <title>Swagger UI</title>
//         <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui.css" />
//         <style>
//           html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
//           *, *:before, *:after { box-sizing: inherit; }
//           body { margin: 0; background: #fafafa; }
//         </style>
//     </head>
//     <body>
//         <div id="swagger-ui"></div>
//         <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
//         <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
//         <script>
//           window.onload = () => {
//             window.ui = SwaggerUIBundle({
//               url: '/api-docs.json',
//               dom_id: '#swagger-ui',
//               deepLinking: true,
//               presets: [
//                 SwaggerUIBundle.presets.apis,
//                 SwaggerUIStandalonePreset
//               ],
//               plugins: [
//                 SwaggerUIBundle.plugins.DownloadUrl
//               ],
//               layout: "StandaloneLayout"
//             });
//           };
//         </script>
//     </body>
//     </html>
//   `);
// });
// app.get("/api-docs.json", (req, res) => {
//   res.json(swaggerDocs);
// });

// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minutes
//   limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// });

// app.use("/v1", mainRoutes);
// app.use("/v1/user", userRoutes);

// Start server (only in development)
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
//   });
// }

// Export for vercel
// export default app;

// This is for Production only
import helmet from "helmet";
import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import mainRoutes from "./main.routes";
import userRoutes from "./user.routes";
import rateLimit from "express-rate-limit";
import compression from "compression";

const app = express();
const PORT = 4000;

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stuff API",
      version: "1.0.0",
      description: "API documentation for Stuff API",
    },
    servers: [
      {
        url: "https://stuff-api.vercel.app/v1",
        description: "Production server",
      },
      {
        url: `http://localhost:${PORT}/v1`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/*.routes.js", "./src/controllers/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/api-docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Swagger UI</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui.css" />
        <style>
          html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
          *, *:before, *:after { box-sizing: inherit; }
          body { margin: 0; background: #fafafa; }
        </style>
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api-docs.json',
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "StandaloneLayout"
            });
          };
        </script>
    </body>
    </html>
  `);
});
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerDocs);
});

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

app.use(compression());

// Apply the rate limiting middleware to API calls only
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/v1", mainRoutes);
app.use("/v1/user", userRoutes);

// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Export for vercel
export default app;
