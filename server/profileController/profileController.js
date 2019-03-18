module.exports = {
    getUser: async (req,res) => {
        const db = req.app.get('db');
        // console.log('hit!')
        const {userId} = req.params;
        // console.log(userId)
        const user = await db.profiles.getProfiles.get_user({id:userId});
        res.status(200).send(user);
    },
    
    getContact: async (req,res) => {
        const db = req.app.get('db')
        console.log('hit!')
        const {userId} = req.params;
        console.log(userId)
        const contact = await db.contact.get_contact({user_id:userId});
        console.log(contact)
        res.status(200).send(contact);
    },
    
    getEdProfile: async (req,res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const edProfile = await db.profiles.getProfiles.get_education({user_id:userId});
        res.status(200).send({edProfile});
    },

    getWorkProfile: async (req,res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const workProfile = await db.profiles.getProfiles.get_work({user_id:userId});
        res.status(200).send({workProfile});
    },

    getSkillsProfile: async (req,res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const skillsProfile = await db.profiles.getProfiles.get_skills({user_id:userId});
        res.status(200).send({skillsProfile});
    },

    getLangProfile: async (req,res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const langProfile = await db.profiles.getProfiles.get_languages({user_id:userId});
        res.status(200).send({langProfile});
    },

    getProjProfile: async (req,res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const projProfile = await db.profiles.getProfiles.get_projects({user_id:userId});
        res.status(200).send({projProfile});
    },

    createProfile: async (req,res)=>{
        // console.log('this hit');
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
            let res = await db.profiles.createProfiles.create_education({sch_name,major,ed_level,sch_loc,grad_date,sch_logo,user_id:id})
            edProfile.push(res);
        };
        
        for(let i=0;i<work.length;i++){
            // console.log('emp_name')
            const {empName:emp_name,position,empLoc:emp_loc,hireDate:hire_date,endDate:end_date,empLogo:emp_logo} = work[i];
            let res = await db.profiles.createProfiles.create_work({emp_name,position,emp_loc,hire_date,end_date,emp_logo,user_id:id});
            workProfile.push(res);
        };
        
        for(let i=0;i<skills.length;i++){
            // console.log('skill')
            const {skill} = skills[i];
            let res = await db.profiles.createProfiles.create_skill({skill,user_id:id});
            skillsProfile.push(res);
        };
        
        for(let i=0;i<languages.length;i++){
            // console.log('language')
            const {language} = languages[i];
            let res = await db.profiles.createProfiles.create_language({language,user_id:id});
            langProfile.push(res);
        } 

        for(let i=0;i<projects.length;i++){
            // console.log('project')
            const {project} = projects[i];
            let res = await db.profiles.createProfiles.create_project({project,user_id:id});
            projProfile.push(res)
        } 

        edProfile=edProfile.pop();
        workProfile=workProfile.pop();
        skillsProfile=skillsProfile.pop();
        langProfile=langProfile.pop();
        projProfile=projProfile.pop();

        // console.log(11111,edProfile,22222,workProfile,33333,skillsProfile,4444,langProfile,55555,projProfile)

        
        res.status(200).send({edProfile,workProfile,skillsProfile,langProfile,projProfile})
    },

    editUserProfile:async (req,res)=>{
        const db = req.app.get('db');
        // console.log('hit!')
        const {id,firstName:first_name,lastName:last_name,email,imageUrl:image_url} = req.body;
        // console.log(id,first_name,last_name,email,image_url)
        const userProfile = await db.profiles.editProfiles.edit_user({id,first_name,last_name,email,image_url})
        // console.log(userProfile);
        res.status(200).send(userProfile)
    },

    editEdProfile: async (req,res) => {
        const db = req.app.get('db');
        // console.log(req.body)
        const {schName:sch_name,schLoc:sch_loc,gradDate:grad_date,schLogo:sch_logo,edLevel:ed_level,major,id,user_id} = req.body;
        // console.log(sch_name,sch_loc,grad_date,sch_logo,ed_level,major,id,user_id)
        const edProfile = await db.profiles.editProfiles.edit_education({sch_name,sch_loc,grad_date,sch_logo,ed_level,major,id,user_id});
        // console.log(edProfile)
        res.status(200).send(edProfile)
    },

    editWorkProfile: async (req,res) => {
        const db = req.app.get('db');
        // console.log(req.body)
        // var {id} = req.session.user;
        // let user_id = id
        // console.log(user_id)
        const {empName:emp_name,empLoc:emp_loc,empLogo:emp_logo,hireDate:hire_date,endDate:end_date,position,id,user_id} = req.body;
        // console.log('hit')
        // console.log(777,emp_name,emp_loc,emp_logo,hire_date,end_date,position,id,user_id)
        const workProfile = await db.profiles.editProfiles.edit_work({emp_name,emp_loc,emp_logo,hire_date,end_date,position,id,user_id});
        // console.log(333,workProfile)
        res.status(200).send(workProfile)
    },

    editSkillsProfile: async (req,res) => {
        const db = req.app.get('db');
        // console.log(req.body)
        const {skill,user_id,id} =req.body;
        // console.log(id,skill,user_id);
        const skillsProfile = await db.profiles.editProfiles.edit_skill({skill,id,user_id});
        // console.log(2222,skillsProfile)
        res.status(200).send(skillsProfile)
    },
    
    editLangProfile: async (req,res) => {
        const db = req.app.get('db');
        // console.log(req.body)

        const {id,language,user_id} = req.body;
        // console.log(id,language,user_id)
        const langProfile = await db.profiles.editProfiles.edit_language({id,language,user_id})
        // console.log(langProfile)
        res.status(200).send(langProfile)
    },

    editProjProfile: async (req,res) => {
        const db = req.app.get('db');
        // console.log(req.body)

        const {id,project,user_id} = req.body;
        // console.log(id,project,user_id)
        const projProfile = await db.profiles.editProfiles.edit_project({id,project,user_id})
        // console.log(projProfile)
        res.status(200).send(projProfile)
    },

    deleteEdProfile: async (req,res) => {
        // console.log('way to go, deleting is happening soon!');
        const db = req.app.get('db');
        // console.log(req.params)
        const {id} = req.params;
        const user_id = req.session.user.id;
        // console.log(id)
        const edProfile = await db.profiles.deleteProfiles.delete_education({id, user_id}) 
        //need to create the delete db file
        res.status(202).send(edProfile)
    },

    deleteWorkProfile: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const user_id = req.session.user.id;
        // console.log(id)
        const workProfile = await db.profiles.deleteProfiles.delete_work({id, user_id}) 
        //need to create the delete db file
        res.status(202).send(workProfile)
    }, 

    deleteSkillsProfile: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const user_id = req.session.user.id;
        // console.log(id)
        const skillsProfile = await db.profiles.deleteProfiles.delete_skill({id, user_id}) 
        //need to create the delete db file
        res.status(202).send(skillsProfile)
    }, 

    deleteLangProfile: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const user_id = req.session.user.id;
        // console.log(id)
        const langProfile = await db.profiles.deleteProfiles.delete_language({id, user_id}) 
        //need to create the delete db file
        res.status(202).send(langProfile)
    },

    deleteProjProfile: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const user_id = req.session.user.id;
        // console.log(id)
        const projProfile = await db.profiles.deleteProfiles.delete_project({id, user_id}) 
        //need to create the delete db file
        res.status(202).send(projProfile)
    },

    addEdProfile: async (req,res) => {
        const db=req.app.get('db');
        // console.log(req.body)
        const {id} = req.session.user
        // console.log({id})
        const {schName:sch_name,major,edLevel:ed_level,schLoc:sch_loc,gradDate:grad_date,schLogo:sch_logo} = req.body;
        // console.log(sch_name,major,ed_level,sch_loc,grad_date,sch_logo)
        const edProfile = await db.profiles.createProfiles.create_education({sch_name,major,ed_level,sch_loc,grad_date,sch_logo,user_id:id})
        // console.log("connected!")
        // console.log(8888,edProfile)
        res.status(200).send(edProfile)
    },

    addWorkProfile: async(req,res)=>{
        const db=req.app.get('db');
        const {id} = req.session.user;
        // console.log(req.body)
        const {empName:emp_name,empLoc:emp_loc,empLogo:emp_logo,hireDate:hire_date,endDate:end_date,position} = req.body;
        // console.log(emp_loc);
        const workProfile = await db.profiles.createProfiles.create_work({emp_name,emp_loc,emp_logo,hire_date,end_date,position,user_id:id});
        res.status(200).send(workProfile)

    },

    addSkillsProfile: async(req,res)=>{
        const db=req.app.get('db');
        const {id} = req.session.user;
        const {skill} = req.body;
        const skillsProfile = await db.profiles.createProfiles.create_skill({skill,user_id:id});
        res.status(200).send(skillsProfile);
        
    },

    addLangProfile: async(req,res)=>{
        const db=req.app.get('db');
        const {id} = req.session.user;
        const {language} = req.body;
        const langProfile = await db.profiles.createProfiles.create_language({language,user_id:id});
        res.status(200).send(langProfile);
    },

    addProjProfile: async(req,res)=>{
        const db=req.app.get('db');
        const {id} = req.session.user;
        const {project} = req.body;
        const projProfile = await db.profiles.createProfiles.create_project({project,user_id:id}) 
        res.status(200).send(projProfile);
    }



} 