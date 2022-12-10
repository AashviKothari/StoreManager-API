const express = require('express')
require('dotenv').config();
require('express-async-errors')
const app = express();
const products = require('./routes/products')
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',products)
app.use(errorMiddleware)
app.use(notFoundMiddleware)

const port = 3000;

const start = async()=>{
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,
            console.log(`Server Running on ${port}`)
        )
    } catch (error) {
        console.log(error)
    }
}
start()