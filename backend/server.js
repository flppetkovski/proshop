const dotenv = require('dotenv').config({path: __dirname + '/.env'})
const colors = require("colors")
const express = require("express")
const connectDB = require("./config/db")
const {notFound} = require("./middleware/errorMiddleware")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
app.get("/", (req, res)=>{
 res.send("API is running")
})

app.use("/products", productRoutes)
app.use("/users", userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
