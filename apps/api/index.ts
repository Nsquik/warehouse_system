import { Response, Request } from "express";

import express from "express";

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/api/greeting", (req: Request, res: Response) => {
  res.send({
    message: `Hello, ${req.query.name || "Worlderer"}!`,
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
