
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const colors=require('colors')
const dotenv=require('dotenv')
const connectDB = require('./config/db')
const path=require('path')


// env config 
dotenv.config()

// routes 
const userRoutes=require('./routes/userRoutes')
const blogRoutes=require('./routes/blogRoutes')

// mango db connection 
connectDB();


const app=express();

// middlewares 
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


// routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/blog',blogRoutes)

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
     res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
// listen  
const PORT=process.env.PORT || 8081

app.listen(PORT,()=>{
    console.log(`server runing in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white);
})
