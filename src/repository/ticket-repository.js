const {NotificationTicket} = require('../models/index');
const {Op} = require('sequelize');

class TicketRepository {
    async getAll(){
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async get(filter){
        try {
            const tickets = await NotificationTicket.findAll({
                where:{
                    status : filter.status,
                    notificationTime :{
                        [Op.lte] : new Date()
                    }
                }
            });
            return tickets;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async create(data){
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async updateTicket(ticketId, data){
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            ticket.status = data.status;
            await ticket.save();
            return ticket;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    


}

module.exports = TicketRepository;