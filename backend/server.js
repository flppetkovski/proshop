const dotenv = require('dotenv').config({path: __dirname + '/.env'})
const colors = require("colors")
const express = require("express")
const connectDB = require("./config/db")
const {notFound} = require("./middleware/errorMiddleware")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const { errorHandler } = require('./middleware/errorMiddleware')
const path = require("path")
const morgan = require("morgan")
connectDB()

const cors = require("cors")

const app = express()
if (process.env.NODE_ENV === "development") {
 app.use(morgan("dev"))
}

app.use(express.json())
app.use(cors())
app.get("/config/paypal", (req,res)=> res.send(process.env.PAYMENT_CLIENT_ID))
app.get("/", (req, res)=>{
 res.send("API is running")
})

app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)
app.use("/upload", uploadRoutes)


const path_file = path.resolve()
app.use("/uploads", express.static(path.join(path_file, "/uploads")))
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
