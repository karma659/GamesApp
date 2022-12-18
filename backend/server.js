import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import dotenv from 'dotenv'

import morgan from 'morgan'

const PORT = 5000;
dotenv.config()
const app = express();



const __dirname = path.resolve();

if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
 }

 const corsOptions = {
   origin: "http://localhost:3000"
};


app.use(cors());
app.use((req, res, next) => { res.header({"Access-Control-Allow-Origin": "*"}); next(); }) 
// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
//All games list
app.get("/api",  cors(corsOptions),async (req, res) => {
   const fetchOptions = {
      method: "GET"
   };
   const response = await fetch(
      "https://www.freetogame.com/api/games?platform=browser",
      fetchOptions
   );
   const jsonResponse = await response.json();

   console.log(jsonResponse);
   res.json(jsonResponse);
});

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/frontend/build")));

   app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
   );
} else {
   app.get("/", (req, res) => {
      console.log("api runiing");
      res.send("API is running....");
     
   });
}

app.listen(PORT, () => {
   console.log(`Example app listening at http://localhost:${PORT}`);
});
