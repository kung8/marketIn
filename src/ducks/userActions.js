import {UPDATE_USER,UPDATE_PROFILE,UPDATE_EDUCATION,UPDATE_WORK,UPDATE_SKILL_AND_LANG,UPDATE_PROJECT} from './constants'

export function updateUser ({first_name,last_name,email,image_url}){
    return {
        type:UPDATE_USER,
        payload:{
            first_name,
            last_name,
            email,
            image_url
        }
    }
}

export function updateProfile (firstName,lastName,email,password,imageUrl){
    return {
        type:UPDATE_PROFILE,
        payload:{
            firstName,
            lastName,
            email,
            password,
            imageUrl
        }
    }
}

export function updateEducation (schName,major,edLevel,schLoc,gradDate,schLogo){
    return {
        type:UPDATE_EDUCATION,
        payload:{
            schName,
            major,
            edLevel,
            schLoc,
            gradDate,
            schLogo
        }
    }
}

export function updateWork (empName,position,empLoc,hireDate,endDate,empLogo){
    return {
        type:UPDATE_WORK,
        payload:{
            empName,
            position,
            empLoc,
            hireDate,
            endDate,
            empLogo
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

export function updateProject (project) {
    return {
        type:UPDATE_PROJECT,
        payload:{
            project
        }
    }
}
