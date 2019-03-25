const stripe = require('stripe')(process.env.STRIPE_SECRET)
module.exports={
    getServices: async (req,res)=>{
        const db = req.app.get('db');
        //send in a user_id from session

        const {userId} = req.params;
        const services = await db.services.get_services({user_id:userId});
        // console.log(services);
        res.status(200).send(services)
    },

    addService: async (req,res)=>{
        const db = req.app.get('db');
        const {price,service,image,id:user_id} = req.body; 
        console.log(price,service,image,user_id)
        console.log(typeof price,service,image,typeof user_id)
        //send in new price, new service, user_id from session, new image
        const services = await db.services.add_service({price,service,image,user_id})
        console.log(services);
        res.status(200).send(services)
        
    },

    updateService:async(req,res)=>{
        const db = req.app.get('db');
        console.log(1111,req.body,req.params,req.session.user)
        const {image,price,service} = req.body;
        const {id} = req.params;
        const user_id = req.session.user.id;
        console.log(222,image,price,service,id,user_id)
        const services = await db.services.update_service({image,price,service,id,user_id})
        //send in new price, new service, new image, id, user_id from session
        console.log(3333,services);
        res.status(200).send(services)
        
    },

    deleteService: async(req,res)=>{
        const db = req.app.get('db');
        // console.log(req.body)
        // console.log(req.params)
        const user_id = req.session.user.id
        const {id} = req.params;
        const services = await db.services.delete_service({id,user_id})
        //send in id,user_id from session
        // console.log(services);
        res.status(200).send(services)
    },

    getAllServices:(req,res)=>{
        const db = req.app.get('db');
        console.log('connected');
    },

    createPayment:(req,res)=>{
        const db = req.app.get('db')
        console.log(req.body);
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
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log(charge)
                    db.payments.create_payment({payer_id,amount,paid_id,service})
                    return res.status(200).send(charge)
                }
            }
        )
    },

    getPayments: async (req,res)=>{
        const db = req.app.get('db');
        console.log("hit",req.params);
        const {id} = req.params;
        const payments = await db.payments.get_payments({payer_id:id,paid_id:id})
        console.log(payments)
        res.status(200).send(payments)
    }
}