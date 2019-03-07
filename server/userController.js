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
        // console.log(1111, newUser,req.session);
        req.session.user = newUser;
        // console.log(2222, newUser,req.session);
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

    logout: (req,res)=>{
        // console.log('logged out connected');
        req.session.destroy();
        res.status(200).send('Logged Out Connected!')
    },

    createProfile: async (req,res)=>{
        // console.log('this worked!');
        const db = req.app.get('db');
        //need to figure out where I would pass the user_id to all of the queries...
        const {schName:sch_Name,major,edLevel:ed_Level,schLoc:sch_Loc,gradDate:grad_Date,schLogo:sch_Logo} = req.body.education;
        const {empName:emp_Name,position,empLoc:emp_Loc,hireDate:hire_Date,endDate:end_Date,empLogo:emp_Logo} = req.body.work;
        const {skill} = req.body.skills;
        const {language} = req.body.languages;
        const {project} = req.body.projects;

        // let profile = await db.create_profile({sch_Name,major,ed_Level,sch_Loc,grad_Date,sch_Logo,emp_Name,position,emp_Loc,hire_Date,end_Date,emp_Logo,skill,language,project})
        let education = await db.create_education({sch_Name,major,ed_Level,sch_Loc,grad_Date,sch_Logo,user_id})
        let work = await db.create_work({emp_Name,position,emp_Loc,hire_Date,end_Date,emp_Logo,user_id})
        let skills = await db.create_skills({skill,user_id})
        let languages = await db.create_languages({language,user_id})
        let projects = await db.create_projects({project,user_id})
        
        res.status(200).send('hello')
    }
}