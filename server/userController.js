const bcrypt = require('bcryptjs');

module.exports={
    getProfile: async (req,res) => {
        // console.log('running getProfile!')
        const db = req.app.get('db');
        
        res.status(200).send('this is working!');
    },

    register: async (req,res) => {
        // console.log('this worked!');
        const db = req.app.get('db');
        // console.log(req.body);
        const {firstName:first_name,lastName:last_name,email,password,imageUrl:image_url} = req.body;
        if(first_name=='',last_name=='',email,password==''){
            return 
        }

        let user = await db.check_user({email});
        // console.log(1111, user)
        user = user[0] 
        // console.log(user)
        //if the email is equal to an existing email in the db then return 'this email is already in the db, please input another email'
        
        if(user){
            return res.sendStatus(409)
        };
        //if the email is available send them to their profile page and they can add things and edit things there.
        //Need to hash their password before registering
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);
        let newUser = await db.register({first_name,last_name,email,password:hash,image_url});
        newUser = newUser[0];
        console.log(1111, newUser,req.session);
        req.session.user = newUser;
        console.log(2222, newUser,req.session);
        res.status(200).send(newUser);
    },

    login: async (req,res) => {
        // console.log('good work!');
        const db = req.app.get('db');
        const {email,password} = req.body;
        let user = await db.login({email});
        user = user[0];
        // console.log(user)
        if(!user){
            return res.status(401).send('email not found')
        } 
        let authenticated = bcrypt.compareSync(password,user.password);
        console.log(authenticated)
        if(authenticated){
            delete user.password;
            req.session.user = user;
            console.log(req.session.user)
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('password is incorrect');
        }
    }, 

    getUser: async (req,res) =>{
        // console.log('still there');
        const db = req.app.get('db');

        res.status(200).send('Session Connected!')
    },

    logout: async (req,res)=>{
        // console.log('logged out connected');
        const db = req.app.get('db');

        res.status(200).send('Logged Out Connected!')
    }
}