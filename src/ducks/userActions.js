import {COLLECT_SERVICE,UPDATE_PHONE, UPDATE_LINKEDIN, UPDATE_SERVICES,UPDATE_VIEWED_USER,UPDATE_USER,UPDATE_EDUCATION,UPDATE_WORK,UPDATE_SKILL,UPDATE_LANG,UPDATE_PROJECT, CLEAR_USER} from './constants'

export function updateUser ({first_name,last_name,email,image_url,id}){
    return {
        type:UPDATE_USER,
        payload:{
            first_name,
            last_name,
            email,
            image_url,
            id
        }
    }
}


export function updateViewedUser ({first_name,last_name,email,image_url,id}){
    return{
        type:UPDATE_VIEWED_USER,
        payload:{
            first_name,
            last_name,
            email,
            image_url,
            id
        }
    }
}

export function updateEducation (education){
    return {
        type:UPDATE_EDUCATION,
        payload:{
            education
        }
    }
}

export function updateWork (work){
    return {
        type:UPDATE_WORK,
        payload:{
            work
        }
    }
}

export function updateSkill (skills) {
    return{
        type:UPDATE_SKILL,
        payload:{
            skills
        }   
    }
}

export function updateLang (languages) {
    return{
        type:UPDATE_LANG,
        payload:{
            languages
        }    
    }
}

export function updateProject (projects) {
    return {
        type:UPDATE_PROJECT,
        payload:{
            projects
        }
    }
}

export function clearUser (){
    return{
        type:CLEAR_USER
    }
}

export function updateServices(services){
    return {
        type:UPDATE_SERVICES,
        payload: {
            services 
        } 
        
    }   
}

export function updatePhone(phone){
    return {
        type:UPDATE_PHONE,
        payload:phone
    }
}

export function updateLinkedIn(linkedIn){
    return {
        type:UPDATE_LINKEDIN,
        payload:linkedIn
    }
}

export function collectService(serv){
    return {
        type:COLLECT_SERVICE,
        payload:serv
    }
}