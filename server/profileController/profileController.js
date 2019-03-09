module.exports = {
    getProfile: async (req,res) => {
        // console.log('running getProfile!')
        const db = req.app.get('db');
        const {id} = req.session.user;
        // console.log(id)
        const edProfile = await db.profiles.getProfiles.get_education({user_id:id});
        const workProfile = await db.profiles.getProfiles.get_work({user_id:id});
        const skillsProfile = await db.profiles.getProfiles.get_skills({user_id:id});
        const langProfile = await db.profiles.getProfiles.get_languages({user_id:id});
        const projProfile = await db.profiles.getProfiles.get_projects({user_id:id});
        // console.log(edProfile,workProfile,skillsProfile,langProfile,projProfile)
        res.status(200).send({edProfile,workProfile,skillsProfile,langProfile,projProfile});
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
            const {empName:emp_Name,position,empLoc:emp_Loc,hireDate:hire_Date,endDate:end_Date,empLogo:emp_Logo} = work[i];
            let res = await db.profiles.createProfiles.create_work({emp_Name,position,emp_Loc,hire_Date,end_Date,emp_Logo,user_id:id});
            workProfile.push(res);
        };
        
        for(let i=0;i<skills.length;i++){
            // console.log('skill')
            const {skill} = skills[i];
            let res = await db.profiles.createProfiles.create_skills({skill,user_id:id});
            skillsProfile.push(res);
        };
        
        for(let i=0;i<languages.length;i++){
            // console.log('language')
            const {language} = languages[i];
            let res = await db.profiles.createProfiles.create_languages({language,user_id:id});
            langProfile.push(res);
        } 

        for(let i=0;i<projects.length;i++){
            // console.log('project')
            const {project} = projects[i];
            let res = await db.profiles.createProfiles.create_projects({project,user_id:id});
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

    editProfile: async (req,res) => {
        // console.log('way to go, editing is happening soon!');
        const db = req.app.get('db');
        // console.log(req.body)
        const {sch_name,sch_loc,grad_date,sch_logo,ed_level,major,id} = req.body;

        const edProfile = await db.profiles.editProfiles.edit_education({sch_name,sch_loc,grad_date,sch_logo,ed_level,major,id});
        // const workProfile = await db.profiles.editProfiles.edit_work();
        // const skillsProfile = await db.profiles.editProfiles.edit_skills();
        // const langProfile = await db.profiles.editProfiles.edit_languages();
        // const projProfile = await db.profiles.editProfiles.edit_projects();

        res.status(200).send(edProfile)
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
        
        console.log("connected!")
    }



} 