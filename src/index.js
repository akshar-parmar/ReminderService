const express =  require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const { urlencoded } = require('body-parser');
const setUpServer = ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT,async()=>{
        console.log(`Server started at PORT ${PORT}`);
    });
};
setUpServer();