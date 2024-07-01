import express from 'express';
import initSocket  from './public/index/socket.io.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from './config.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import MongoSingleton from './utils.js';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const expressInstance = app.listen(config.PORT, async () => {
    //await mongoose.connect(config.MONGO_URI,);
    MongoSingleton.getInstance();
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
})

app.set('view engine' );
app.set('views', path.join(__dirname + '/views'));
app.use('static', express.static(path.join(__dirname + '/dist')));
app.use(cookieParser(config.SECRET));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.urlencoded({ extended: true }));


const socketServer = initSocket(expressInstance);
app.set('socketServer', socketServer);


export default app;

