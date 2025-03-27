import helmet from "helmet";
import express from "express";

import mainRoutes from "./main.routes";
import userRoutes from "./user.routes";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(helmet());

app.use("/v1", mainRoutes);
app.use("/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
