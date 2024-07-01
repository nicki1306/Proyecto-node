import jwt from 'jsonwebtoken';
import config from './config.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { get } from 'http';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class MongoSingleton {
    constructor() {
        if (!MongoSingleton.instance) {
            MongoSingleton.instance = this;
            this.connect();
        }
        return MongoSingleton.instance;
    }

    async connect() {
        try {
            await mongoose.connect(config.MONGO_URI);
            console.log('Base de datos conectada');
        } catch (error) {   
            console.log(error);
        }
    }
}
export const mongoSingleton = new MongoSingleton();
export default __dirname;


