const cron = require('node-cron'); 
const { set } = require('../config/email-config');
const emailService = require('../services/email-service');

const sender = require('../config/email-config');



/* 
shift+alt+A to create multiline comment
Every 5 minutes we will run our job
we will check are their any pending emails which was expected to be sent 
by now and is pending
*/

const setupJobs = ()=>{
    const task = cron.schedule('*/2 * * * *', async() =>  {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {

            sender.sendMail({
                to : email.recepientEmail,
                subject : email.subject,
                text : email.content
            },async(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id,{status:"SUCCESS"});
                }
            });

        });
        console.log(response);
    });
 
}

module.exports = setupJobs;
