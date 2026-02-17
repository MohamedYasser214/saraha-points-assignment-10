import express from "express";
import connectionDB from "./DB/connectionDB.js";
import { userRouter } from "./modules/users/index.js";

const app = express();
const port = 3000;
const bootstrap = () => {
  connectionDB();

  // handel buffer data
  app.use(express.json());
  app.use("/user", userRouter);

  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome on Saraha App...😉" });
  });

  app.all("{/*dumy}", (req, res, next) => {
    throw new Error(`Url: ${req.originalUrl} Invalid Routing........` , {cause: 404});

  });

  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.cause || 500).send("Something broke!");
  });

  app.listen(port, () => {
    console.log(`server is running on port ::: ${port}🚀`);
  });
};

export default bootstrap;
