import express from "express"
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"

const app = express();


//middleware
app.use(express.json());
//morgan
app.use(morgan("tiny"));

import usersRouter from "./routes/usersRouter.js"
import booksRouter from "./routes/booksRouter.js"
import searchRouter from "./routes/searchRouter.js"
import cartRouter from "./routes/cartRouter.js"
import likesRouter from "./routes/likesRouter.js"
import reviewRouter from "./routes/reviewRouter.js"

//mongoose connect 
mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(cors({origin:["http://localhost:5174"],exposedHeaders:["token"]}))


//routes
app.use("/api/users", usersRouter);
app.use("/api/books",booksRouter);
app.use("/api/search",searchRouter);
app.use("/api/cart",cartRouter);
app.use("/api/likes",likesRouter);
app.use("/api/reviews",reviewRouter);
 
//error handling

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Internal server error");
  });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("connected to server on port", PORT));