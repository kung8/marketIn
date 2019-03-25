module.exports = {
    getContact: async (req,res) => {
        const db = req.app.get('db')
        const {userId} = req.params;
        const contact = await db.contact.get_contact({user_id:userId});
        res.status(200).send(contact);
    },

    addPhone: async (req,res) =>{
        const db = req.app.get('db');
        const {phone} = req.body;
        const user_id = req.params.id;
        let user = await db.contact.check_contact({user_id})
        user = user[0];
        if(user){
            const phoneNum = await db.contact.update_phone({phone,user_id});
            res.status(200).send(phoneNum);
        }
        else {
            const phoneNum = await db.contact.add_phone({phone,user_id});
            res.status(200).send(phoneNum);
        }
    },

    addLinkedIn: async (req,res) =>{
        const db = req.app.get('db');
        const {linkedIn} = req.body;
        const user_id = req.params.id;
        let user = await db.contact.check_contact({user_id});
        user = user[0];
        if(user){
            const linked = await db.contact.update_linkedin({linkedin:linkedIn,user_id})
            res.status(200).send(linked);
        } else {
            const linked = await db.contact.add_linkedin({linkedin:linkedIn,user_id});
            res.status(200).send(linked);
        }
    },

    updatePhone: async (req,res) =>{
        const db = req.app.get('db');
        const {phone} = req.body;
        const user_id = req.params.id;
        const phoneNum = await db.contact.update_phone({phone,user_id});
        res.status(200).send(phoneNum);
    },

    updateLinkedIn: async (req,res) =>{
        const db = req.app.get('db');
        const {linkedIn} = req.body;
        const user_id = req.params.id;
        const linked = await db.contact.update_linkedin({linkedin:linkedIn,user_id})
        res.status(200).send(linked);
    }
}