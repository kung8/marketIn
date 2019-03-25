const bcrypt = require('bcryptjs');

module.exports={
    register: async (req,res) => {
        const db = req.app.get('db');
        const {firstName:first_name,lastName:last_name,email,password,imageUrl:image_url} = req.body;
        let user = await db.users.check_user({email});
        user = user[0] 
        //if the email is equal to an existing email in the db then return 'this email is already in the db, please input another email'
        
        if(user){
            return res.sendStatus(409)
        };
        //if the email is available send them to their profile page and they can add things and edit things there.
        //Need to hash their password before registering
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);
        let newUser = await db.users.register({first_name,last_name,email,password:hash,image_url});
        newUser = newUser[0];
        req.session.user = newUser;
        res.status(200).send(newUser);
    },

    login: async (req,res) => {
        const db = req.app.get('db');
        const {email,password} = req.body;
        let user = await db.users.login({email});
        user = user[0];
        if(!user){
            return res.status(401).send('email not found')
        } 
        let authenticated = bcrypt.compareSync(password,user.password);
        if(authenticated){
            delete user.password;
            req.session.user = user;
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('password is incorrect');
        }
    }, 

    getUser: async (req,res) =>{
        const db = req.app.get('db');
        if(req.session.user){
            res.status(200).send(req.session.user);
        } else {
            res.sendStatus(401);
        }
    },

    logout: (req,res)=>{
        req.session.destroy(function(){
            res.status(200).send('Logged Out Connected!')
        });
    }
}