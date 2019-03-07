import {UPDATE_USER,UPDATE_PROFILE,UPDATE_EDUCATION,UPDATE_WORK,UPDATE_SKILL_AND_LANG,UPDATE_PROJECT} from './constants'

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    imageUrl:'',
    education: [
        {
            schName:'',
            major:'',
            edLevel:'',
            schLoc:'',
            gradDate:'',
            schLogo:''
        }
    ],
    work: [
        {
            empName:'',
            position:'',
            empLoc:'',
            hireDate:'',
            endDate:'',
            empLogo:''
        }
    ],
    skills: [
        {
            skill:''
        }
    ],
    languages: [
        {
            language:''
        }
    ],
    projects: [
        {
            project:''
        }
    ]
}

export default function userReducer(state = initialState,action){
    console.log(333,action.payload)
    
    switch(action.type){
        case UPDATE_USER:
            const {first_name:firstName,last_name:lastName,email,image_url:imageUrl} = action.payload;
            return {...state,firstName,lastName,email,imageUrl};
        // case UPDATE_PROFILE:
        //     const {firstName,lastName,email,password,imageUrl} = action.payload;
        //     return {...state,firstName,lastName,email,password,imageUrl};
        case UPDATE_EDUCATION:
            const {schName,major,edLevel,schLoc,gradDate,schLogo} = action.payload
            // console.log(4444,schName)
            return {...state,schName,major,edLevel,schLoc,gradDate,schLogo};
        case UPDATE_WORK:
            const {empName,position,empLoc,hireDate,endDate,empLogo} = action.payload;
            return {...state,empName,position,empLoc,hireDate,endDate,empLogo};
        case UPDATE_SKILL_AND_LANG:
            const {skills,languages} = action.payload
            // console.log(7777,skill,language)
            // skills = skills.push(skill)
            // languages = languages.push(language)
            return {...state,skills,languages}
        case UPDATE_PROJECT:
            const {project} = action.payload;
            return {...state,project}
        default: 
            return state
    }
}

