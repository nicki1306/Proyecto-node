import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-dom/server';
import config from '../src/config.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';

import initSocket from './public/index/socket.io.js';
import MongoSingleton from '../src/service/MongoSingleton.js';

import productRouter from '../src/routes/ProductRoutes.js';
import cartRouter from '../src/routes/CartRouter.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const expressInstance = app.listen(config.PORT, async () => {
    try {
        
        MongoSingleton.getInstance();
        console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
});

app.set('view engine');
app.set('views', path.join(__dirname + '/views'));
app.use('static', express.static(path.join(__dirname + '/dist')));
app.use(cookieParser(config.SECRET));


app.use(session({
    secret: config.SECRET,  
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const socketServer = initSocket(expressInstance);
app.set('socketServer', socketServer);


export default app;

