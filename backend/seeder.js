const mongoose = require("mongoose")
const dotenv = require('dotenv').config({path: __dirname + '/.env'})
const colors = require("colors")
const products = require("./data/products")
const users = require("./data/users")
const User = require("./models/userModel")
const Product = require("./models/productModel")
const Order = require("./models/orderModel")
const connectDB = require("./config/db")

connectDB()

const importData = async ()=> {
 try {
  await Order.deleteMany()
  await Product.deleteMany()
  await User.deleteMany()

  const createdUsers = await User.insertMany(users)
  const adminUser = createdUsers[0]._id
  const sampleProducts = products.map(product => {
   return {...product, user: adminUser}
  } )
  await Product.insertMany(sampleProducts)
  console.log("Data imported".green.inverse)
  process.exit()
 } catch (error) {
  console.error(`${error}`.red.inverse)  
 process.exit()
 }
}

const destroyData = async ()=> {
 try {
  await Order.deleteMany()
  await Product.deleteMany()
  await User.deleteMany()
 
  console.log("Data Destroyed".red.inverse)
  process.exit()
 } catch (error) {
  console.error(`${error}`.red.inverse)  
 process.exit()
 }
}

if (process.argv[2]=== "-d") {
 destroyData()
} else {
 importData()
}