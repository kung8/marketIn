const bcrypt = require('bcryptjs');

module.exports={
    getProfile: async (req,res) => {
        // console.log('running getProfile!')
        const db = req.app.get('db');
        
        res.status(200).send('this is working!')
    }
}