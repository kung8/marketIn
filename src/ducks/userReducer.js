import {COLLECT_SERVICE,UPDATE_VIEWED_USER,UPDATE_USER,UPDATE_EDUCATION,UPDATE_WORK,UPDATE_SKILL,UPDATE_LANG,UPDATE_PROJECT,CLEAR_USER, UPDATE_SERVICES, UPDATE_PHONE, UPDATE_LINKEDIN} from './constants'


const initialState = {
    id:0,
    firstName:'',
    lastName:'',
    email:'',
    imageUrl:'',
    education:[],
    work: [],
    skills: [],
    languages: [],
    projects: [],
    viewedUserId:0,
    userFirstName:'',
    userLastName:'',
    userEmail:'',
    userImageUrl:'',
    services:[],
    phone:'',
    linkedIn:'',
    service:'',
    price:0,
    serviceId:0,
    serviceImg:''
}

export default function userReducer(state = initialState,action){
    switch(action.type){
        case UPDATE_VIEWED_USER:
            const {first_name:userFirstName,last_name:userLastName,email:userEmail,image_url:userImageUrl,id:viewedUserId} = action.payload;
            return {...state,viewedUserId,userFirstName,userLastName,userEmail,userImageUrl}
        case UPDATE_USER:
            const {first_name:firstName,last_name:lastName,email,image_url:imageUrl,id} = action.payload;
            return {...state,firstName,lastName,email,imageUrl,id};
        case UPDATE_EDUCATION:
            const {education} = action.payload
            return {...state,education};
        case UPDATE_WORK:
            const {work} = action.payload;
            return {...state,work};
        case UPDATE_SKILL:
            const {skills} = action.payload
            return {...state,skills};
        case UPDATE_LANG:
            const {languages} = action.payload
            return {...state,languages};    
        case UPDATE_PROJECT:
            const {projects} = action.payload;
            return {...state,projects};
        case UPDATE_SERVICES:
            const {services} = action.payload;
            return {...state,services};
        case UPDATE_PHONE:
            return {...state,phone:action.payload}
        case UPDATE_LINKEDIN:    
            return {...state,linkedIn:action.payload}
        case COLLECT_SERVICE:
            const {service,price,id:serviceId,image:serviceImg} = action.payload
            return {...state,service,price,serviceId,serviceImg}
        case CLEAR_USER:
            return {...state,firstName:'',lastName:'',email:'',imageUrl:'',id:0,education:[],work:[],skills:[],languages:[],projects:[],userEmail:'',userFirstName:'',userLastName:'',userImageUrl:'',viewedUserId:'',phone:'',linkedIn:'',price:0,service:'',serviceId:0,serviceImg:''}
        default: 
            return state
    }
}

