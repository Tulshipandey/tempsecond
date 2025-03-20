const dotenv = require('dotenv');
dotenv.config();

const _config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://tulshiprashadpandey892:Tulshi@123@learningnode.wxnki.mongodb.net/',
    JWT_SECRET: process.env.JWT_SECRET
}

const config = Object.freeze(_config);
module.exports = config ;
