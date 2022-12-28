const express = require('express');
const app = express();

const { PORT } = require('./config/serverConfig');
const db = require('./models');

const apiRoutes = require('./routes/index');

app.use(express.json());


const setupAndStartServer = async () => {

    app.use('/api',apiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server Started at ${PORT}`);
    })
}

setupAndStartServer();