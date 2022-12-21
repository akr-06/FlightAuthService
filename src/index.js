const express = require('express');
const app = express();

const { PORT } = require('./config/serverConfig');

const setupAndStartServer = async () => {
    app.listen(PORT,()=>{
        console.log(`Server Started at ${PORT}`);
    })
}

setupAndStartServer();