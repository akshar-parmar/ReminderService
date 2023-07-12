const express =  require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
//const bodyParser} = require('body-parser');
const {sendBasicEmail} = require('./services/email-service');
const jobs = require('./utils/jobs');
const TicketController = require('./controller/ticket-controller');
const {createChannel,subscribeMessage} = require('./utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig');
const emailService = require('./services/email-service');


const setUpServer = async()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    const channel = await createChannel();
    subscribeMessage(channel,emailService,REMINDER_BINDING_KEY);

    app.post('/api/v1/tickets',TicketController.create);

    app.listen(PORT,async()=>{
        console.log(`Reminder Server started at PORT ${PORT}`);
        //jobs();
       
    });
};
setUpServer();