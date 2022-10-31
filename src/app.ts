import "reflect-metadata";
import "express-async-errors";
import express from "express";

const app = express();
app.use(express.json());

app.use("/teste", (resp, res) => {
  return res.status(201).json({ ok: "tudo ok" });
});

export default app;
