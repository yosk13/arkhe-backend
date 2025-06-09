import express from "express";
import cors from "cors";
import entradasRouter from "./routes/entradas";

const app = express();

app.use(
  cors({
    origin: "https://arkhe-frontend.vercel.app", // solo acepta desde el frontend productivo
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/entradas", entradasRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🕯️  Arkhé API corriendo en http://localhost:${PORT}`);
});
