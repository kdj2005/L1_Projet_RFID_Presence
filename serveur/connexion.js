const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("vous êtes connecté à la base de données")
    }
    catch(err){
        console.error("Erreur de connexion à la base de données", err)
        process.exit(1)
        
    }
}

module.exports = connectDB