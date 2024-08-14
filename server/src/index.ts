import express, { Express } from "express";
import { add, getAllEvents, getTkt } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.post("/api/add", add);
app.post("/api/getTkt", getTkt);
app.get("/api/getEvt", getAllEvents);
app.listen(port, () => console.log(`Server listening on ${port}`));
