const express =  require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
//const bodyParser} = require('body-parser');
const {sendBasicEmail} = require('./services/email-service');

const setUpServer = ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT,async()=>{
        console.log(`Server started at PORT ${PORT}`);
        // sendBasicEmail(
        //     'support@admin.com',   //from
        //     'sampletest5854@gmail.com', //to
        //     'This is a testing email',  //subject
        //     'Hey, how are you, I hope you like the support'  //body
        // );
    });
};
setUpServer();