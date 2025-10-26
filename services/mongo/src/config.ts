export const config = {
    // Corrected URI with password 'example'
    mongoURI: process.env.MONGO_URI || "mongodb://root:example@mongo:27017/secshop?authSource=admin",
    
    // Corrected port variable
    port: process.env.PORT || 4005 
};