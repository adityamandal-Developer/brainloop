import { Router } from "express";
import { ask, askcheck } from "../service/ask.service";

const askRouter = Router();

askRouter.post("/ask", ask);
askRouter.post("/ask-check", askcheck);
export default askRouter;
