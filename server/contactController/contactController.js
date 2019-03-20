module.exports = {
    getContact: async (req,res) => {
        const db = req.app.get('db')
        console.log('hit!')
        const {userId} = req.params;
        console.log(userId)
        const contact = await db.contact.get_contact({user_id:userId});
        console.log(contact)
        res.status(200).send(contact);
    },

    addPhone: async (req,res) =>{
        const db = req.app.get('db');
        console.log(req.body);
        const {phone} = req.body;
        console.log(phone);
        const user_id = req.params.id;
        console.log(user_id);
        let user = await db.contact.check_contact({user_id})
        user = user[0];
        if(user){
            //update their information
            const phoneNum = await db.contact.update_phone({phone,user_id});
            console.log(phoneNum);
            res.status(200).send(phoneNum);
        }
        else {
            //add them into the system
            const phoneNum = await db.contact.add_phone({phone,user_id});
            console.log(phoneNum);
            res.status(200).send(phoneNum);
        }
    },

    addLinkedIn: async (req,res) =>{
        const db = req.app.get('db');
        console.log(req.body)
        const {linkedIn} = req.body;
        const user_id = req.params.id;
        console.log(user_id);
        let user = await db.contact.check_contact({user_id});
        user = user[0];
        if(user){
            const linked = await db.contact.update_linkedin({linkedin:linkedIn,user_id})
            console.log(linked)
            res.status(200).send(linked);
        } else {
            const linked = await db.contact.add_linkedin({linkedin:linkedIn,user_id});
            console.log(linked);
            res.status(200).send(linked);
        }
    },

    updatePhone: async (req,res) =>{
        const db = req.app.get('db');
        console.log(req.body);
        const {phone} = req.body;
        console.log(phone);
        const user_id = req.params.id;
        console.log(user_id);
        const phoneNum = await db.contact.update_phone({phone,user_id});
        console.log(phoneNum);
        res.status(200).send(phoneNum);
    },

    updateLinkedIn: async (req,res) =>{
        const db = req.app.get('db');
        console.log(req.body)
        const {linkedIn} = req.body;
        console.log(linkedIn)
        const user_id = req.params.id;
        console.log(user_id);
        const linked = await db.contact.update_linkedin({linkedin:linkedIn,user_id})
        console.log(linked)
        res.status(200).send(linked);
    }
}