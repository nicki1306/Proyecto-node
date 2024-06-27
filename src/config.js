import path from 'path';

const config = {
    PORT: 8080,
    SECRET: 'mysecret',
    SERVER: 'ATLAS',
    MONGO_URI: 'mongodb+srv://nicki:gatito1306.@cluster0.sxitpsr.mongodb.net/',
    MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    PRODUCTS_PER_PAGE: 10,

    get UPLOAD_DIR()  { return path.join(this.DIRNAME, 'public', 'images'); },

};

export default config;