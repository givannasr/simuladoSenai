import express from "express";
import router from "./src/routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const port = 3000;

app.use(cors());

const { json, urlenconded} = bodyParser;
app.use(json());
app.use(urlenconded({extended: false}));
app.use('/', router);
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`);
})
