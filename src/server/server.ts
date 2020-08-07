import app from "../app";
import { Server } from "http";

const server: Server = app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});

export default server;
