import app from "./src/app.js";
import env from "dotenv";

env.config();
const port = process.env.SERVER_PORT;

app.listen(port, ()=> console.log(`Server is running on ${port}`));