import app from "./src/app.js";
import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(process.cwd(), '.env') });
const port = process.env.SERVER_PORT;

app.listen(port, ()=> console.log(`Server is running on ${port}`));