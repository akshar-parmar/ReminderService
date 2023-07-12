const sender = require('../config/email-config');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom,mailTo,mailSubject,mailBody) =>{
    try {
        const response = sender.sendMail({
            from : mailFrom,
            to : mailTo,
            subject : mailSubject,
            text : mailBody
        });
        //console.log(response);
    } catch (error) {
        console.log(error);
    }

}

const fetchPendingEmails = async(timestamp)=>{
    try {
        const response = await repo.get({status : "PENDING"});
        return response;
    } catch (error) {
        console.log("something went wrong in the service layer");
        console.log(error);
    }
}

const createNotification = async(data)=>{
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log("something went wrong in the service layer");
        console.log(error);       
    }
}

const updateTicket = async(ticketId, data)=>{
    try {
        const response = await repo.updateTicket(ticketId, data);
        return response;
    } catch (error) {
        console.log("something went wrong in the service layer");
        console.log(error);       
    }
};

const subscribeEvents = async(payload)=>{
    const data = payload.data;
    if(payload.service =='Create_Notification_ticket'){
        const ticket = await createNotification(data);
        console.log("Successfully created the ticket");
        return ticket;
    }
    else if(payload.service =='Send_Basic_mail'){
        try {
            console.log("sending basic email");
            const response = await sendBasicEmail(
                'nventOffical.com',
                data.recepientEmail,
                data.subject,
                data.content
            );
            return response;
        } catch (error) {
            console.log("error sending the basic email")
        }

    }
    else{
        console.log("no service matching with subscribe event")
    }
    
}



module.exports  = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
}