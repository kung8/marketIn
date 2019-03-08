const bcrypt = require('bcryptjs');

module.exports={
    getProfile: async (req,res) => {
        // console.log('running getProfile!')
        const db = req.app.get('db');
        const {id} = req.session.user;
        console.log(id)
        const edProfile = await db.get_education({user_id:id});
        const workProfile = await db.get_work({user_id:id});
        const skillsProfile = await db.get_skills({user_id:id});
        const langProfile = await db.get_languages({user_id:id});
        const projProfile = await db.get_projects({user_id:id});
        console.log(edProfile,workProfile,skillsProfile,langProfile,projProfile)
        res.status(200).send({edProfile,workProfile,skillsProfile,langProfile,projProfile});
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
        if(req.session.user){
            res.status(200).send(req.session.user);
        } else {
            res.sendStatus(401);
        }
    },

    logout: (req,res)=>{
        // console.log('logged out connected');
        req.session.destroy(function(){
            res.status(200).send('Logged Out Connected!')
        });
    },

    createProfile: async (req,res)=>{
        console.log('this hit');
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {education,work,skills,languages,projects} = req.body;
        // console.log(education,work,skills,languages,projects)
        //need to figure out where I would pass the user_id to all of the queries...
       let edProfile = [];
       let workProfile = [];
       let skillsProfile = [];
       let langProfile = [];
       let projProfile = [];

        //loop through the array one at a time and send that to the db to insert into the table. 
        for(let i=0;i<education.length;i++){
            // console.log('sch_name')
            const {schName:sch_name,major,edLevel:ed_level,schLoc:sch_loc,gradDate:grad_date,schLogo:sch_logo} = education[i];
            let res = await db.create_education({sch_name,major,ed_level,sch_loc,grad_date,sch_logo,user_id:id})
            edProfile.push(res);
        };
        
        for(let i=0;i<work.length;i++){
            // console.log('emp_name')
            const {empName:emp_Name,position,empLoc:emp_Loc,hireDate:hire_Date,endDate:end_Date,empLogo:emp_Logo} = work[i];
            let res = await db.create_work({emp_Name,position,emp_Loc,hire_Date,end_Date,emp_Logo,user_id:id});
            workProfile.push(res);
        };
        
        for(let i=0;i<skills.length;i++){
            // console.log('skill')
            const {skill} = skills[i];
            let res = await db.create_skills({skill,user_id:id});
            skillsProfile.push(res);
        };
        
        for(let i=0;i<languages.length;i++){
            // console.log('language')
            const {language} = languages[i];
            let res = await db.create_languages({language,user_id:id});
            langProfile.push(res);
        } 

        for(let i=0;i<projects.length;i++){
            // console.log('project')
            const {project} = projects[i];
            let res = await db.create_projects({project,user_id:id});
            projProfile.push(res)
        } 

        edProfile=edProfile.pop();
        workProfile=workProfile.pop();
        skillsProfile=skillsProfile.pop();
        langProfile=langProfile.pop();
        projProfile=projProfile.pop();

        console.log(11111,edProfile,22222,workProfile,33333,skillsProfile,4444,langProfile,55555,projProfile)

        
        res.status(200).send({edProfile,workProfile,skillsProfile,langProfile,projProfile})
    }
}