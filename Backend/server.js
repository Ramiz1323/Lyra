import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { generateResponse } from "./src/services/ai.service.js";

generateResponse();

connectDB();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;