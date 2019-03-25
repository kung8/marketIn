const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports={
    getServices: async (req,res)=>{
        const db = req.app.get('db');
        const {userId} = req.params;
        const services = await db.services.get_services({user_id:userId});
        res.status(200).send(services)
    },

    addService: async (req,res)=>{
        const db = req.app.get('db');
        const {price,service,image,id:user_id} = req.body; 
        const services = await db.services.add_service({price,service,image,user_id})
        res.status(200).send(services)
    },

    updateService:async(req,res)=>{
        const db = req.app.get('db');
        const {image,price,service} = req.body;
        const {id} = req.params;
        const user_id = req.session.user.id;
        const services = await db.services.update_service({image,price,service,id,user_id})
        res.status(200).send(services)
    },

    deleteService: async(req,res)=>{
        const db = req.app.get('db');
        const user_id = req.session.user.id
        const {id} = req.params;
        const services = await db.services.delete_service({id,user_id})
        res.status(200).send(services)
    },

    getAllServices:(req,res)=>{
        const db = req.app.get('db');
    },

    createPayment:(req,res)=>{
        const db = req.app.get('db')
        const {token:{id},amount,id:payer_id,viewedUserId:paid_id,service} = req.body;
        stripe.charges.create(
            {
                amount:amount,
                currency:'usd',
                source:id,
                description:'Test Charge'
            },
            (err, charge) => {
                if(err) {
                    return res.status(500).send(err)
                } else {
                    db.payments.create_payment({payer_id,amount,paid_id,service})
                    return res.status(200).send(charge)
                }
            }
        )
    },

    getPayments: async (req,res)=>{
        const db = req.app.get('db');
        const {id} = req.params;
        const payments = await db.payments.get_payments({payer_id:id,paid_id:id})
        res.status(200).send(payments)
    }
}