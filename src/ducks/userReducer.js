const initialState = {
    email:'',
    firstName:'',
    lastName:'',
    password:'',
    image:'',
    education: [
        {
            schName:'',
            major:'',
            location:'',
            gradDate:'',
        }
    ],
    work: [
        {
            empName:'',
            position:'',
            location:'',
            hireDate:'',
            endDate:'',
        }
    ],
    skill: [
        {
            skill:''
        }
    ],
    language: [
        {
            language:''
        }
    ],
    project: [
        {
            project:''
        }
    ]
    
}

export default function userReducer(state,action){
    switch(action.type){
        default: 
            return state
    }
}