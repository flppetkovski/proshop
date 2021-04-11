const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async ()=>{
try {
 
const conn = await mongoose.connect(process.env.MONGO_URI, {
 useCreateIndex: true,
useUnifiedTopology: true,
useNewUrlParser: true
})
console.log(`MONGO DB CONNECTED: ${conn.connection.host}`.cyan.underline)

} catch (error) {
 console.error(`Error: ${error.message}`.red.underline.bold)
 process.exit(1)
}

}

module.exports = connectDB