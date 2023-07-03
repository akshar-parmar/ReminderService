const express =  require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
//const bodyParser} = require('body-parser');
const {sendBasicEmail} = require('./services/email-service');
const jobs = require('./utils/jobs');
const TicketController = require('./controller/ticket-controller');


const setUpServer = ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.post('/api/v1/tickets',TicketController.create);
    
    
    
    app.listen(PORT,async()=>{
        console.log(`Server started at PORT ${PORT}`);
        //jobs();
       
    });
};
setUpServer();