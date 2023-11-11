const app=require('./app');
const connectDatabase = require('./db/database');


// handelling the errors , uncaught exceptions
process.on('uncaughtException', (err)=>{
    console.log(`ERROR:${err.message}`)
    console.log('shutting down the server for handeling uncaught exceptions');

})


// config

if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config({
        path:"./config/.env"
    })
}

// connect database

connectDatabase();

// create server
const server =app.listen(process.env.PORT,()=>{
    console.log(`server listening to port ${process.env.PORT}`)
})


// unhandeled promess rejection


process.on('unhandledRejection',(err)=>{
    console.log(`shutting down the server with ${err.message}`);
    console.log('shutting dow the server for unhandled rejection');


    server.close(()=>{
        process.exit(1)
    })
})