import { Router } from "express";
import { ask } from "../service/ask.service";

const askRouter = Router();

askRouter.post("/ask", ask);

export default askRouter;
