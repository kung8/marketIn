import {UPDATE_USER,UPDATE_EDUCATION,UPDATE_WORK,UPDATE_SKILL_AND_LANG,UPDATE_PROJECT, CLEAR_USER} from './constants'

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

export function updateSkillAndLang (skills,languages) {
    return{
        type:UPDATE_SKILL_AND_LANG,
        payload:{
            skills,
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