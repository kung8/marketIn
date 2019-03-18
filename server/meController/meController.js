module.exports = {
    getMeProfile: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const me = await db.me.get_me_profile({id})
        res.status(200).send(me)
    },
    
    getMeContact: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const me = await db.me.get_me_contact({id})
        res.status(200).send(me)
    },
    
    getMeServices: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const me = await db.me.get_me_services({id})
        res.status(200).send(me)
    }

}