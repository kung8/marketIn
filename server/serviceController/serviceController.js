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
        //send in new price, new service, new image, id, user_id from session
        console.log('connected');
        
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
    }
}