import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";
import userRoutes from "./routes/user.routes";
import { authenticated } from "./middleware/authenticated";
import bodyParser from "body-parser";
import askRouter from "./routes/ask.route";

const app = express();

const PORT = process.env.PORT || 8080;

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    // credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use("/auth", authRouter);
app.use("/user", authenticated, userRoutes);
app.use("/ai", askRouter);

app.use(errorHandler);
app.get("/", async (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`running port ${PORT}`);
});

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
        iat?: string;
        exp?: string;
      };
      customProperty?: string;
    }
  }
}
