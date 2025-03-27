import helmet from "helmet";
import express from "express";
import cors from "cors";

import mainRoutes from "./main.routes";
import userRoutes from "./user.routes";
import rateLimit from "express-rate-limit";
import compression from "compression";

const app = express();
const PORT = 4000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
